const fs = require('fs')
const remark = require('remark')
const rlc = require('.')

const doc = fs.readFileSync('fixture.md', 'utf8')

test('adds BREAKING to h1s', async () => {
  const result = await remark()
    .use(rlc)
    .process(doc)
  expect(result.contents).toContain('# BREAKING Hello, world!')

  console.log(result.contents);
})