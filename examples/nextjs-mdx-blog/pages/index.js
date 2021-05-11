import Head from 'next/head'
import CustomLink from '@/components/link'
import { Container, Box, Heading, UnorderedList, ListItem } from '@chakra-ui/react'

export default function Home() {
  return (
    <Container maxW="container.xl">
      <Head>
        <title>remark-link-card</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="remark-link-card" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://remark-link-card-gladevise.vercel.app" />
      </Head>

      <Box as="main">
        <Heading as="h1" size="3xl">remark-link-card</Heading>
        <Heading as="h2" size="xl">Features</Heading>
        <UnorderedList fontSize="xl">
          <ListItem>Convert text link to link card element</ListItem>
          <ListItem>Download favicon and open graph image for next/image</ListItem>
        </UnorderedList>
        <Heading as="h2" size="xl">Demos</Heading>
        <UnorderedList fontSize="xl">
          <ListItem><CustomLink href="/rlc-simple/sample" >simple usage example</CustomLink></ListItem>
          <ListItem><CustomLink href="/with-cache/sample" >image optimization with next/image</CustomLink></ListItem>
          <ListItem><CustomLink href="/shorten-url/sample" >display only hostname</CustomLink></ListItem>
          <ListItem><CustomLink href="/rlc-practical/sample" >practical usage example</CustomLink></ListItem>
        </UnorderedList>
      </Box>
    </Container>
  )
}
