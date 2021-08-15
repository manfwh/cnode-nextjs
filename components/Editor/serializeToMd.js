import escapeHtml from 'escape-html';

const defaultNodeTypes = {
  paragraph: 'p',
  block_quote: 'blockquote',
  code_block: 'code_block',
  link: 'a',
  ul_list: 'ul',
  ol_list: 'ol',
  listItem: 'li',
  heading: {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
    5: 'h5',
    6: 'h6',
  },
  emphasis_mark: 'italic',
  strong_mark: 'bold',
  delete_mark: 'strikeThrough',
  inline_code_mark: 'code',
  thematic_break: 'thematic_break',
  image: 'image',
} 
const isLeafNode = (node) => {
  return typeof node.text === 'string';
};

const VOID_ELEMENTS = ['thematic_break'];

const BREAK_TAG = '<br>';

export default function serialize(
  chunk,
  opts = { nodeTypes: defaultNodeTypes},
) {
  const {
    nodeTypes: userNodeTypes = defaultNodeTypes,
    ignoreParagraphNewline = false,
    listDepth = 0,
  } = opts;

  let text = chunk.text || '';
  let type = chunk.type || '';

  const nodeTypes = {
    ...defaultNodeTypes,
    ...userNodeTypes,
    heading: {
      ...defaultNodeTypes.heading,
      ...userNodeTypes.heading,
    },
  };

  const LIST_TYPES = [nodeTypes.ul_list, nodeTypes.ol_list];

  let children = text;
  if (!isLeafNode(chunk)) {
    children = chunk.children
      .map((c) => {
        const isList = !isLeafNode(c)
          ? LIST_TYPES.includes(c.type || '')
          : false;

        const selfIsList = LIST_TYPES.includes(chunk.type || '');

        // Links can have the following shape
        // In which case we don't want to surround
        // with break tags
        // {
        //  type: 'paragraph',
        //  children: [
        //    { text: '' },
        //    { type: 'link', children: [{ text: foo.com }]}
        //    { text: '' }
        //  ]
        // }
        let childrenHasLink = false;

        if (!isLeafNode(chunk) && Array.isArray(chunk.children)) {
          childrenHasLink = chunk.children.some(
            (f) => !isLeafNode(f) && f.type === nodeTypes.link
          );
        }

        return serialize(
          { ...c, parentType: type },
          {
            nodeTypes,
            // WOAH.
            // what we're doing here is pretty tricky, it relates to the block below where
            // we check for ignoreParagraphNewline and set type to paragraph.
            // We want to strip out empty paragraphs sometimes, but other times we don't.
            // If we're the descendant of a list, we know we don't want a bunch
            // of whitespace. If we're parallel to a link we also don't want
            // to respect neighboring paragraphs
            ignoreParagraphNewline:
              (ignoreParagraphNewline ||
                isList ||
                selfIsList ||
                childrenHasLink) &&
              // if we have c.break, never ignore empty paragraph new line
              !c.break,

            // track depth of nested lists so we can add proper spacing
            listDepth: LIST_TYPES.includes(c.type || '')
              ? listDepth + 1
              : listDepth,
          }
        );
      })
      .join('');
  }

  // This is pretty fragile code, check the long comment where we iterate over children
  if (
    !ignoreParagraphNewline &&
    (text === '' || text === '\n') &&
    chunk.parentType === nodeTypes.paragraph
  ) {
    type = nodeTypes.paragraph;
    children = BREAK_TAG;
  }

  if (children === '' && !VOID_ELEMENTS.find((k) => nodeTypes[k] === type))
    return;

  // Never allow decorating break tags with rich text formatting,
  // this can malform generated markdown
  // Also ensure we're only ever applying text formatting to leaf node
  // level chunks, otherwise we can end up in a situation where
  // we try applying formatting like to a node like this:
  // "Text foo bar **baz**" resulting in "**Text foo bar **baz****"
  // which is invalid markup and can mess everything up
  if (children !== BREAK_TAG && isLeafNode(chunk)) {
    if (chunk.strikeThrough && chunk.bold && chunk.italic) {
      children = retainWhitespaceAndFormat(children, '~~***');
    } else if (chunk.bold && chunk.italic) {
      children = retainWhitespaceAndFormat(children, '***');
    } else {
      if (chunk.bold) {
        children = retainWhitespaceAndFormat(children, '**');
      }

      if (chunk.italic) {
        children = retainWhitespaceAndFormat(children, '_');
      }

      if (chunk.strikeThrough) {
        children = retainWhitespaceAndFormat(children, '~~');
      }

      if (chunk.code) {
        children = retainWhitespaceAndFormat(children, '`');
      }
    }
  }

  switch (type) {
    case nodeTypes.heading[1]:
      return `# ${children}\n`;
    case nodeTypes.heading[2]:
      return `## ${children}\n`;
    case nodeTypes.heading[3]:
      return `### ${children}\n`;
    case nodeTypes.heading[4]:
      return `#### ${children}\n`;
    case nodeTypes.heading[5]:
      return `##### ${children}\n`;
    case nodeTypes.heading[6]:
      return `###### ${children}\n`;

    case nodeTypes.block_quote:
      // For some reason, marked is parsing blockquotes w/ one new line
      // as contiued blockquotes, so adding two new lines ensures that doesn't
      // happen
      return `> ${children}\n\n`;

    case nodeTypes.code_block:
      return `\`\`\`${
        chunk.language || ''
      }\n${children}\n\`\`\`\n`;

    case nodeTypes.link:
      return `[${children}](${chunk.url || ''})`;
    case nodeTypes.image:
      return `![${chunk.alt}](${
        chunk.url || ''
      })`;

    case nodeTypes.ul_list:
    case nodeTypes.ol_list:
      return `\n${children}\n`;

    case nodeTypes.listItem:
      const isOL = chunk && chunk.parentType === nodeTypes.ol_list;

      let spacer = '';
      for (let k = 0; listDepth > k; k++) {
        if (isOL) {
          // https://github.com/remarkjs/remark-react/issues/65
          spacer += '   ';
        } else {
          spacer += '  ';
        }
      }
      return `${spacer}${isOL ? '1.' : '-'} ${children}\n`;

    case nodeTypes.paragraph:
      return `${children}\n`;

    case nodeTypes.thematic_break:
      return `---\n`;

    default:
      return escapeHtml(children);
  }
}

// This function handles the case of a string like this: "   foo   "
// Where it would be invalid markdown to generate this: "**   foo   **"
// We instead, want to trim the whitespace out, apply formatting, and then
// bring the whitespace back. So our returned string looks like this: "   **foo**   "
function retainWhitespaceAndFormat(string, format) {
  // we keep this for a comparison later
  const frozenString = string.trim();

  // children will be mutated
  let children = frozenString;

  // We reverse the right side formatting, to properly handle bold/italic and strikeThrough
  // formats, so we can create ~~***FooBar***~~
  const fullFormat = `${format}${children}${reverseStr(format)}`;

  // This conditions accounts for no whitespace in our string
  // if we don't have any, we can return early.
  if (children.length === string.length) {
    return fullFormat;
  }

  // if we do have whitespace, let's add our formatting around our trimmed string
  // We reverse the right side formatting, to properly handle bold/italic and strikeThrough
  // formats, so we can create ~~***FooBar***~~
  const formattedString = format + children + reverseStr(format);

  // and replace the non-whitespace content of the string
  return string.replace(frozenString, formattedString);
}

const reverseStr = (string) => string.split('').reverse().join('');
