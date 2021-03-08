const fs = require('fs')
const remark = require('remark')
const rlc = require('.')

const doc = fs.readFileSync('fixture.md', 'utf8')

// Bare links are converted link cards.
test('convert bare links to link cards', async () => {
  const result = await remark()
    .use(rlc)
    .process(doc)
  expect(result.contents).toContain('</a>')

  console.log(result.contents);
})

// Inline links are not converted to link cards.

// Multiple links in one line are not converted to link cards