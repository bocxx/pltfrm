// pages/drafts.tsx

import React from 'react'
import { Box } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useSession, getSession } from 'next-auth/react'
import Post, { PostProps } from '../lib/components/Post'
import prisma from '../lib/prisma'

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })
  if (!session) {
    res.statusCode = 403
    return { props: { drafts: [] } }
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: session.user.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  })
  return {
    props: { drafts },
  }
}

type Props = {
  drafts: PostProps[]
}

const Drafts: React.FC<Props> = (props) => {
  const { data: session } = useSession()

  if (!session) {
    return (
      <Box>
        <h1>Ongepubliceerde Aanbiedingen</h1>
        <div>You need to be authenticated to view this page.</div>
      </Box>
    )
  }

  return (
    <Box>
      <h1>Ongepubliceerde Aanbiedingen</h1>
      <Box>
        {props.drafts.map((post) => (
          <div key={post.id} className='post'>
            <Post post={post} />
          </div>
        ))}
      </Box>
    </Box>
  )
}

export default Drafts
