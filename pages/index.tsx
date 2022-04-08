import { Box, SimpleGrid } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import Post, { PostProps } from '../lib/components/Post'
import prisma from '../lib/prisma'

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  })
  return { props: { feed } }
}

type Props = {
  feed: PostProps[]
}

const Home: React.FC<Props> = (props) => {
  return (
    <Box>
      <SimpleGrid minChildWidth='220px' spacing='40px'>
        {props.feed.map((post) => (
          <Box key={post.id} className='post'>
            <Post post={post} />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default Home
