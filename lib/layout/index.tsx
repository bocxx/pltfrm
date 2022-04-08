import { Box } from '@chakra-ui/react'
import type { ReactNode } from 'react'

import Footer from './Footer'
import Header from './Header'
import Navbar from './Navbar'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box>
      <Box margin='0 auto' maxWidth={1024} transition='0.5s ease-out'>
        <Box margin='8'>
          <Navbar />
          <Header />
          <Box as='main' marginY={22}>
            {children}
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout
