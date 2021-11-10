import { useEffect, useState } from 'react'
import { ELEMENT_LINK, upsertLinkAtSelection } from '@udecode/plate-link'
import { ToolbarButton, ToolbarButtonProps } from '@udecode/plate-toolbar'
import { Link } from '@styled-icons/material/Link'
import { useStoreEditorState, useEventEditorId } from '@udecode/plate'
import { Dialog } from '@headlessui/react'
import { Editor, Range, Transforms } from 'slate'
import { Popover } from '@headlessui/react'
import { usePopper } from 'react-popper'
const ToolbarLink = (props) => {
  const editor = useStoreEditorState(useEventEditorId('focus'))
  let [referenceElement, setReferenceElement] = useState()
  let [popperElement, setPopperElement] = useState()
  let { styles, attributes } = usePopper(referenceElement, popperElement)
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({left: 0, top: 0})
  const [linkText, setLinkText] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [placeholderLink, setPlaceholderLink] = useState()
  useEffect(() => {
    console.log('value:', editor.children)

  }, [editor.children])
  return (
    <>
      <ToolbarButton
        onMouseDown={(event) => {
          event.preventDefault()
          const domSelection = window.getSelection();
          if(!domSelection) return
          const domRange = domSelection.getRangeAt(0);
          const rect = domRange.getBoundingClientRect();
          setPosition({
            left: rect.left + window.pageXOffset + rect.width,
            top: rect.top + window.pageYOffset + rect.height
          })
          const { selection } = editor
          const isCollapsed = selection && Range.isCollapsed(selection)
          // Transforms.insertNodes(editor, {
          //   type: 'a',
          //   url: 'jd.com',
          //   children: [{
          //     text: '链接'
          //   }]
          // }, {
          //   // at: Editor.above(editor)[1]
          // })
          if(!isCollapsed) {
            setLinkText(Editor.string(editor, selection))
          }
          console.log(selection)
          const target = selection
          setPlaceholderLink(selection)
          // Transforms.select(editor, Editor.above(editor)[1])
          
          // Transforms.removeNodes(editor)
          // console.log(Editor.above(editor))
          setIsOpen(true)

          // Transforms.collapse(editor, { edge: 'end' });
          // Editor.insertText(editor, '链接')
          // console.log(Editor.above(editor))
          // console.log(Editor.string(editor, editor.selection))
        }}
        {...props}
      />
      <Dialog
        open={isOpen}
        onClose={() => {
          console.log('close')
        }}
        style={position}
        className="fixed z-10 w-64 p-4 shadow left-0 top-0 overflow-y-auto bg-white rounded-sm"
      >
        <label className="block">
          <div className="text-gray-900 text-sm mb-2">文本</div>
          <div className="mb-4">
            <input 
              value={linkText}
              onChange={e => setLinkText(e.target.value)}
              placeholder="添加描述"
            className="focus:outline-none w-full transition border-gray-400 border rounded-sm px-2 py-1 focus:border-green-500 text-sm" />
          </div>
        </label>
        <label className="block">
          <div className="text-gray-900 text-sm mb-2">链接</div>
          <div className="mb-4">
            <input 
              value={linkUrl}
              onChange={ e => setLinkUrl(e.target.value)}
              className="focus:outline-none w-full transition border-gray-400 border rounded-sm px-2 py-1 focus:border-green-500 text-sm"
              placeholder="链接地址"
            />
          </div>
        </label>
        <div>
          <button className="bg-green-500 text-white rounded-sm px-4 py-1 hover:bg-green-600 transition text-sm mr-2 " onClick={() => {
            setIsOpen(false)
            const { selection } = editor
            const isCollapsed = selection && Range.isCollapsed(selection)
            console.log(placeholderLink)
            Transforms.insertNodes(editor, {
              type: 'a',
              url: linkUrl,
              children: [{text: linkText}],
            }, {
              at: placeholderLink
            })
            console.log(Editor.after(editor, placeholderLink))
            Transforms.select(editor, {
              ...Editor.after(editor, placeholderLink),
              offset: linkText.length
            })
            // Transforms.collapse(editor, { edge: 'end' })
            console.log(editor)
          }}>确定</button>
        </div>
        
      </Dialog>
    </>
  )
}

export default ToolbarLink
