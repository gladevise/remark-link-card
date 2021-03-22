const fs = require('fs')
const HTMLParser = require('node-html-parser')
const remark = require('remark')
const renderToString = require('next-mdx-remote/render-to-string')
const rlc = require('.')

const doc = fs.readFileSync('fixture.md', 'utf8')

const inlineLinksSample = `
[example](http://example.com/) is inline link

[remark-link-card](https://www.npmjs.com/package/remark-link-card) is inline link
`.trim()

const multipleLinksSample = `
http://example.com/ http://example.com/ http://example.com/
`.trim()

// Bare links are converted link cards.
test('convert bare links to link cards', async () => {
  const result = await remark()
    .use(rlc)
    .process(doc)
  expect(result.contents).toContain('</a>')

  // console.log(result.contents);
})

// Inline links are not converted to link cards.
test('Inline links are not converted to link cards.', async () => {
  const result = await remark()
    .use(rlc)
    .process(inlineLinksSample)
  expect(result.contents.trim()).toEqual(inlineLinksSample)

  // console.log(result.contents);
})

// Multiple links in one line are not converted to link cards
test('Multiple links in one line are not converted to link cards', async () => {
  const result = await remark()
    .use(rlc)
    .process(multipleLinksSample)
  expect(result.contents.trim()).toEqual(multipleLinksSample)

  // console.log(result.contents);
})

test('Multiple links in one line are not converted to link cards with next-mdx-remote', async () => {

  const mdxSource = await renderToString(
    multipleLinksSample,
    {
      mdxOptions: {
        remarkPlugins: [
          rlc
        ]
      }
    }
  )
  expect(mdxSource.renderedOutput.trim()).toEqual(`<p><a href="http://example.com/">http://example.com/</a> <a href="http://example.com/">http://example.com/</a> <a href="http://example.com/">http://example.com/</a></p>`.trim())

  console.log(mdxSource.renderedOutput);
})

// Use cache ogImage
test('Use cache ogImage', async () => {
  const result = await remark()
    .use(rlc, { cache: true })
    .process('https://www.npmjs.com/package/remark-link-card')

  const parsedOutput = HTMLParser.parse(result.contents)
  const imageElements = parsedOutput.querySelectorAll('img')
  const imgSrcList = imageElements.map(element => {
    return element.getAttribute('src')
  })
  // console.log(imgSrcList);
  // Check ogImage is saved and path resolved?

  // Check img path is resolved?

  // console.log(result.contents);
})