import { Global, css } from '@emotion/react'
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import rlc from 'remark-link-card'
import CustomImage from '@/components/image'

import { getAllPosts, getPostBySlug } from '@/lib/api'

const components = {
  img: CustomImage
}

export default function Post({ source, frontMatter }) {
  const content = hydrate(source, { components })

  return (
    <>
      <Global styles={css`
      .rlc-container {
        width: 100%;
        max-width: 800px;
        max-height: 120px;
        margin: 0 auto 2rem;

        color: black;
        text-decoration: none;

        border: 1px solid black;
        border-radius: 0.25rem;
        display: flex;
        align-items: stretch;

        transition: background 200ms ease-in-out 0s, box-shadow 200ms ease-in-out 0s;
      }

      .rlc-container:hover{
        background-color: rgba(80,80,80, 0.1);
        box-shadow: 0 4px 5px 2px rgba(80,80,80, 0.2);
      }

      .rlc-info {
        overflow: hidden;
        padding: 0.5rem;
        flex: 4 1 100px;
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .rlc-title {
        font-size: 1.25rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .rlc-description {
        font-size: 0.875rem;
        color: #333;
        overflow: hidden;
        line-height:1rem;
        height: 2rem;
      }

      .rlc-url-container {
        display: flex;
        align-items: center;
      }

      .rlc-url-container > div {
        margin-right: 4px !important;
      }

      .rlc-favicon {
        margin-right: 4px;
        width: 16px;
        height: 16px;
      }

      .rlc-url {
        font-size: 1rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .rlc-image-container {
        position: relative;
        flex: 1 1 100px;
      }

      .rlc-image-container > div {
        position: static !important;
      }

      .rlc-image {
        object-fit: cover;
        width: 100%;
        height: 100%;
        border-bottom-right-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
      }
    `} />
      <div css={css`
        max-width: 1440px;
        margin: 0 auto;
        padding: 3rem;
      `}>
        <h1>{frontMatter.title}</h1>
        {content}
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

  const mdxSource = await renderToString(content, {
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