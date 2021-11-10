const CodeBlockElement = props => {
  const { attributes, children, nodeProps } = props;
  return (
    <pre
      {...attributes}
      {...nodeProps}
      className="whitespace-pre-wrap py-3 px-4 bg-gray-900 text-white"
    >
      <code>{children}</code>
    </pre>
  ); 
}

export default CodeBlockElement