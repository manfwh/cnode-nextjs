import React, { useMemo } from 'react'
import 'tippy.js/dist/tippy.css';
import {
  Plate,
  createReactPlugin,
  createHistoryPlugin,
  ELEMENT_PARAGRAPH,
  createPlateComponents,
  createPlateOptions,
  HeadingToolbar,
  createDeserializeMDPlugin,
  createAutoformatPlugin,
  createResetNodePlugin,
  createAlignPlugin,
  createTrailingBlockPlugin,
  createExitBreakPlugin,
  createListPlugin,
  createImagePlugin,
  ToolbarImage,
  ELEMENT_IMAGE,
  createSelectOnBackspacePlugin,

  // ToolbarLink,
  createLinkPlugin,
  createSoftBreakPlugin,
  createBasicElementPlugins,
  createBasicMarkPlugins,
  createDeserializeHTMLPlugin,
  ELEMENT_CODE_BLOCK,
  useStoreEditorRef,
  ToolbarButton
} from '@udecode/plate'
  
import {ToolbarButtonsBasicMarks,ToolbarButtonsAlign, ToolbarButtonsList, ToolbarButtonsBasicElements } from './Toolbars'
import { Image as ImageIcon } from '@styled-icons/material/Image'
import { Link } from '@styled-icons/material/Link';

import {optionsAutoformat} from './autoformatRules'
import { editableProps, optionsResetBlockTypePlugin, optionsSoftBreakPlugin, optionsExitBreakPlugin } from './pluginOptions'
import CodeBlockElement from './Element/code-block'
import ToolbarLink from './Element/link-ui/ToolbarLink'

const Editor = (props) => {
  const pluginsMemo  = useMemo(() => {
    const pluginsCore = [createReactPlugin(), createHistoryPlugin()];
    const pluginsBasic = [
      ...pluginsCore,
      createAlignPlugin(),

      createLinkPlugin(),
      createImagePlugin(),
      createListPlugin(),
      ...createBasicElementPlugins(),
      ...createBasicMarkPlugins(),
      createAutoformatPlugin(optionsAutoformat),
      createResetNodePlugin(optionsResetBlockTypePlugin),
      createSoftBreakPlugin(optionsSoftBreakPlugin),
      createSelectOnBackspacePlugin({ allow: [ELEMENT_IMAGE] }),
      createExitBreakPlugin(optionsExitBreakPlugin),
      createTrailingBlockPlugin({ type: ELEMENT_PARAGRAPH }),
      
    ]
    pluginsBasic.push(...[
      createDeserializeMDPlugin({plugins: pluginsBasic}),
      createDeserializeHTMLPlugin({plugins: pluginsBasic})
    ])
    return pluginsBasic
    
  }, [])
  const components = createPlateComponents()
  const options = createPlateOptions()
  const editor = useStoreEditorRef();
  components[ELEMENT_CODE_BLOCK] = CodeBlockElement
  return (
    <Plate
      editableProps={editableProps}
      plugins={pluginsMemo}
      components={components}
      options={options}
      onChange={props.onChange}
      value={props.value}
    >
      <HeadingToolbar>
        <ToolbarButtonsBasicElements />
        <ToolbarImage icon={<ImageIcon />} tooltip={{ content: '插入图片' }} />
        <ToolbarLink icon={<Link />} tooltip={{ content: '插入链接' }} />
        <ToolbarButtonsAlign />
        <ToolbarButtonsList />
        <ToolbarButtonsBasicMarks />
        <ToolbarButton icon={<Link />} tooltip={{ content: '超链接' }} />
      </HeadingToolbar>
    </Plate>
  )
}
export default Editor
