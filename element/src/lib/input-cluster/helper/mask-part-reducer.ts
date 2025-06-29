import {
  TEXT_DISPLAY_TYPE_LITERAL,
} from '$lib/literal/index.js'

import type {
  EditorPartLiteral,
} from '$lib/literal/index.js'

import {
  COMPONENT_IMAGE,
} from '$lib/image/index.js'

import type {
  EditorPartImage,
} from '$lib/image/index.js'

import type {
  EditorPartText,
  InputMask,
  InputPart,
  TextInputPartObjects,
} from '$lib/text-input/index.js'

let attachNext: boolean = false,
  lastDynamicPart: TextInputPartObjects | undefined

function attachParts() {
  if (lastDynamicPart) {
    if (!lastDynamicPart.editor) {
      lastDynamicPart.editor = {}
    }
    lastDynamicPart.editor.isAttachedOnRight = true
  }
  attachNext = true
}

export const prepareMaskPartReducer = (dynamicParts: TextInputPartObjects[], dynamicPartMap: {[key: number] : number}) => 
{
  return (aggregator: InputMask, maskPiece: InputPart, index: number) : InputMask => {
    if (index === 0) {
      attachNext = false
      lastDynamicPart = undefined
    }
    aggregator.push(maskPiece)

    if (typeof maskPiece === 'string') {
      return aggregator
    }
    switch (maskPiece.type) {
      case TEXT_DISPLAY_TYPE_LITERAL:
        const literalEditorConfig = maskPiece.editor as EditorPartLiteral
        if (literalEditorConfig
          && literalEditorConfig.borderless) {
          attachParts()
        }
        break
      case COMPONENT_IMAGE:
        if (!maskPiece.editor) {
          maskPiece.editor = {}
        }
        const imageEditorConfig = maskPiece.editor as EditorPartImage
        if (lastDynamicPart) {
          imageEditorConfig.isAttachedOnLeft = true
        }
        if (attachNext) {
          imageEditorConfig.isAttachedOnLeft = true
          attachNext = false
        }
        if (imageEditorConfig.seamless) {
          imageEditorConfig.isAttachedOnRight = true
          attachParts()
        }
        break
      default:
        if (attachNext) {
          if (!maskPiece.editor) {
            maskPiece.editor = {}
          }
          const editorConfig = maskPiece.editor as EditorPartText | EditorPartImage
          editorConfig.isAttachedOnLeft = true
          attachNext = false
        }
        dynamicPartMap[index] = dynamicParts.length
        dynamicParts.push(maskPiece as TextInputPartObjects)
        lastDynamicPart = maskPiece as TextInputPartObjects
    }

    return aggregator
  }
}