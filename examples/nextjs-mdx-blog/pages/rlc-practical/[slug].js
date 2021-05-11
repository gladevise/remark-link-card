import Head from 'next/head'
import { Global } from '@emotion/react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import rlc from 'remark-link-card'
import gfm from 'remark-gfm'
import remarkRelativeLinks from 'remark-relative-links'
import remarkEmbdder from '@remark-embedder/core'
import oembedTransformer from '@remark-embedder/transformer-oembed'
import { Container } from '@chakra-ui/react'
import { getAllPosts, getPostBySlug } from '@/lib/api'
import { H1, H2, H3, H4, H5, H6 } from '@/components/heading'
import CustomImage from '@/components/image'
import CustomLink from '@/components/link'
import rlcStyle from '@/styles/rlcStyle'

const components = {
  img: CustomImage,
  a: CustomLink,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
}

export default function Post({ source, frontMatter }) {

  return (
    <>
      <Head>
        <title>{`${frontMatter.title} | remark-link-card`}</title>
        <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8" />
        <meta property="og:title" content={frontMatter.title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://remark-link-card.vercel.app/rlc-practical/${frontMatter.slug}`} />
        <meta property="og:image" content={`https://remark-link-card.vercel.app${frontMatter.coverImage}`} />
      </Head>
      <Global styles={rlcStyle} />
      <Container maxW="container.xl" p="12">
        <H1>{frontMatter.title}</H1>
        <MDXRemote {...source} components={components} />
      </Container>
    </>
  )
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'description',
    'datePublished',
    'dateModified',
    'slug',
    'coverImage',
    'content',
  ]);

  const { content, ...frontMatter } = post;

  // create relative links regex
  const domainRegex = new RegExp(`https?://(www.)?${process.env.SITE_DOMAIN}[\/]?`);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      components,
      remarkPlugins: [
        [remarkEmbdder, {
          transformers: [
            oembedTransformer
          ]
        }],
        [rlc, { cache: true }],
        gfm,
        [remarkRelativeLinks, { domainRegex }]
      ],
    },
    scope: frontMatter,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter,
    },
  };

}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
}