import html from 'rehype-stringify'
import visit  from 'unist-util-visit'
const unified = require('unified');
const remarkParse = require('remark-parse');
const remarkRehype = require('remark-rehype');
const rehypePrism = require('./rehype-prism')

const tokenClassNames = {
  tag: 'text-code-red',
  'attr-name': 'text-code-yellow',
  'attr-value': 'text-code-green',
  deleted: 'text-code-red',
  inserted: 'text-code-green',
  punctuation: 'text-code-white',
  keyword: 'text-code-purple',
  string: 'text-code-green',
  function: 'text-code-blue',
  boolean: 'text-code-red',
  comment: 'text-gray-400 italic',
  parameter: 'text-orange-500',
  method: 'text-teal-400'
}

export default async function markdownToHtml(markdown) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrism, { ignoreMissing: true })
    .use(() => (tree) => {
      visit(tree, 'element', (node) => {
        let [token, type] = node.properties.className || []
        if (token === 'token') {
          if(tokenClassNames[type]) {
            node.properties.className = [tokenClassNames[type]]
          }
        }
      })
  }).use(html).process(markdown)
  return result.toString()
}