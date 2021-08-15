import React from 'react'
import { CodeBlock } from '@styled-icons/boxicons-regular/CodeBlock'
import { CodeAlt } from '@styled-icons/boxicons-regular/CodeAlt'
import { Superscript } from '@styled-icons/foundation/Superscript'
import { Subscript } from '@styled-icons/foundation/Subscript'
import {
  ELEMENT_ALIGN_CENTER,
  ELEMENT_ALIGN_JUSTIFY,
  ELEMENT_ALIGN_RIGHT,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_OL,
  ELEMENT_UL,
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE,
  getPlatePluginType,
  ToolbarElement,
  ToolbarList,
  ToolbarMark,
  ToolbarAlign,
  useStoreEditorRef,
} from '@udecode/plate'
import { useEventEditorId } from '@udecode/plate-core'
import { Looks3 } from '@styled-icons/material/Looks3'
import { Looks4 } from '@styled-icons/material/Looks4'
import { Looks5 } from '@styled-icons/material/Looks5'
import { Looks6 } from '@styled-icons/material/Looks6'
import { LooksOne } from '@styled-icons/material/LooksOne'
import { LooksTwo } from '@styled-icons/material/LooksTwo'
import { FormatQuote } from '@styled-icons/material/FormatQuote'
import { ToolbarCodeBlock } from '@udecode/plate-code-block-ui'
import { ELEMENT_CODE_BLOCK } from '@udecode/plate-code-block'
import { FormatAlignCenter } from '@styled-icons/material/FormatAlignCenter'
import { FormatAlignJustify } from '@styled-icons/material/FormatAlignJustify'
import { FormatAlignLeft } from '@styled-icons/material/FormatAlignLeft'
import { FormatAlignRight } from '@styled-icons/material/FormatAlignRight'
import { FormatBold } from '@styled-icons/material/FormatBold'
import { FormatItalic } from '@styled-icons/material/FormatItalic'
import { FormatListBulleted } from '@styled-icons/material/FormatListBulleted'
import { FormatListNumbered } from '@styled-icons/material/FormatListNumbered'
import { FormatStrikethrough } from '@styled-icons/material/FormatStrikethrough'
import { FormatUnderlined } from '@styled-icons/material/FormatUnderlined'

export const ToolbarButtonsBasicElements = () => {
  const editor = useStoreEditorRef(useEventEditorId('focus'))

  return (
    <>
      <ToolbarElement
        tooltip={{ content: '标题一' }}
        type={getPlatePluginType(editor, ELEMENT_H1)}
        icon={<LooksOne />}
      />
      <ToolbarElement
        tooltip={{ content: '标题二' }}
        type={getPlatePluginType(editor, ELEMENT_H2)}
        icon={<LooksTwo />}
      />
      <ToolbarElement
        tooltip={{ content: '标题三' }}
        type={getPlatePluginType(editor, ELEMENT_H3)}
        icon={<Looks3 />}
      />
      <ToolbarElement
        tooltip={{ content: '标题四' }}
        type={getPlatePluginType(editor, ELEMENT_H4)}
        icon={<Looks4 />}
      />
      <ToolbarElement
        tooltip={{ content: '标题五' }}
        type={getPlatePluginType(editor, ELEMENT_H5)}
        icon={<Looks5 />}
      />
      <ToolbarElement
        tooltip={{ content: '标题六' }}
        type={getPlatePluginType(editor, ELEMENT_H6)}
        icon={<Looks6 />}
      />
      <ToolbarElement
        tooltip={{ content: '引用' }}
        type={getPlatePluginType(editor, ELEMENT_BLOCKQUOTE)}
        icon={<FormatQuote />}
      />
      <ToolbarCodeBlock
        tooltip={{ content: '代码块' }}
        type={getPlatePluginType(editor, ELEMENT_CODE_BLOCK)}
        icon={<CodeBlock />}
      />
    </>
  )
}

export const ToolbarButtonsList = () => {
  const editor = useStoreEditorRef(useEventEditorId('focus'))

  return (
    <>
      <ToolbarList
        tooltip={{ content: '无序列表' }}
        type={getPlatePluginType(editor, ELEMENT_UL)}
        icon={<FormatListBulleted />}
      />
      <ToolbarList
        tooltip={{ content: '有序列表' }}
        type={getPlatePluginType(editor, ELEMENT_OL)}
        icon={<FormatListNumbered />}
      />
    </>
  )
}

export const ToolbarButtonsAlign = () => {
  const editor = useStoreEditorRef(useEventEditorId('focus'))

  return (
    <>
      <ToolbarAlign
        tooltip={{ content: '左对齐' }}
        icon={<FormatAlignLeft />}
      />
      <ToolbarAlign
        tooltip={{ content: '居中' }}
        type={getPlatePluginType(editor, ELEMENT_ALIGN_CENTER)}
        icon={<FormatAlignCenter />}
      />
      <ToolbarAlign
        tooltip={{ content: '右对齐' }}
        type={getPlatePluginType(editor, ELEMENT_ALIGN_RIGHT)}
        icon={<FormatAlignRight />}
      />
      <ToolbarAlign
        tooltip={{ content: '两端对齐' }}
        type={getPlatePluginType(editor, ELEMENT_ALIGN_JUSTIFY)}
        icon={<FormatAlignJustify />}
      />
    </>
  )
}

export const ToolbarButtonsBasicMarks = () => {
  const editor = useStoreEditorRef(useEventEditorId('focus'))

  return (
    <>
      <ToolbarMark
        tooltip={{ content: '文字加粗' }}
        type={getPlatePluginType(editor, MARK_BOLD)}
        icon={<FormatBold />}
      />
      <ToolbarMark
        tooltip={{ content: '斜体' }}
        type={getPlatePluginType(editor, MARK_ITALIC)}
        icon={<FormatItalic />}
      />
      <ToolbarMark
        tooltip={{ content: '下划线' }}
        type={getPlatePluginType(editor, MARK_UNDERLINE)}
        icon={<FormatUnderlined />}
      />
      <ToolbarMark
        tooltip={{ content: '删除线' }}
        type={getPlatePluginType(editor, MARK_STRIKETHROUGH)}
        icon={<FormatStrikethrough />}
      />
      <ToolbarMark
        tooltip={{ content: '代码' }}
        type={getPlatePluginType(editor, MARK_CODE)}
        icon={<CodeAlt />}
      />
      <ToolbarMark
        tooltip={{ content: '上标' }}
        type={getPlatePluginType(editor, MARK_SUPERSCRIPT)}
        clear={getPlatePluginType(editor, MARK_SUBSCRIPT)}
        icon={<Superscript />}
      />
      <ToolbarMark
        tooltip={{ content: '下标' }}
        type={getPlatePluginType(editor, MARK_SUBSCRIPT)}
        clear={getPlatePluginType(editor, MARK_SUPERSCRIPT)}
        icon={<Subscript />}
      />
    </>
  )
}

