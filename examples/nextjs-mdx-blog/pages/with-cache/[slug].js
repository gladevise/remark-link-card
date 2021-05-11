import { Global, css } from '@emotion/react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import rlc from 'remark-link-card'
import CustomImage from '@/components/image'

import rlcStyle from '@/styles/rlcStyle'
import { getAllPosts, getPostBySlug } from '@/lib/api'

const components = {
  img: CustomImage
}

export default function Post({ source, frontMatter }) {

  return (
    <>
      <Global styles={rlcStyle} />
      <div css={css`
        max-width: 1440px;
        margin: 0 auto;
        padding: 3rem;
      `}>
        <h1>{frontMatter.title}</h1>
        <MDXRemote {...source} components={components} />
      </div>
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

  const mdxSource = await serialize(content, {
    mdxOptions: {
      components,
      remarkPlugins: [
        [rlc, { cache: true }],
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