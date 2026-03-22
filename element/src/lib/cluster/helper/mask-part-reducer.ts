import {
  CONTROL_INPUT_TYPE_BUTTON,
  CONTROL_INPUT_TYPE_RESET,
  CONTROL_INPUT_TYPE_SUBMIT,
} from '$lib/types.js'

import {
  wrapOnBlur,
  wrapOnEvent,
  wrapOnError,
  wrapOnFocus,
  wrapOnInit,
  wrapOnInput,
  wrapOnKeyPress,
  wrapOnMouseAction,
} from '$lib/helper/index.js'

import type {
  ComponentButton
} from '$lib/button/index.js'

import {
  preparePushExtraCharactersToNext,
  INPUT_TYPE_NUMBER,
  INPUT_TYPE_TEL,
} from '$lib/input/index.js'

import {
  COMPONENT_LITERAL,
} from '$lib/literal/index.js'

import type {
  LiteralDisplayProps,
} from '$lib/literal/index.js'

import {
  COMPONENT_IMAGE,
} from '$lib/image/index.js'

import type {
  EditorPartImage,
} from '$lib/image/index.js'

import type {
  InputMask,
  InputPart,
  TextInputPartObjects,
} from '$lib/text-input/index.js'

import {
  allowCopyPaste,
} from '../action/index.js'

import type { MaskPartReducerProps } from '../types.js'



let attachNext: boolean = false,
  lastDynamicPart: TextInputPartObjects | undefined

function attachParts() {
  if (lastDynamicPart) {
    if (!lastDynamicPart.editor) {
      lastDynamicPart.editor = {}
    }
    lastDynamicPart.isAttachedOnRight = true
  }
  attachNext = true
}

export const prepareMaskPartReducer = (properties: MaskPartReducerProps) => 
{
  const {
    data,
    id,
    keyMap,
    nestedValidators,
    onBlur,
    onChange,
    onError,
    onFocus,
    onInit,
    onInput,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseUp,
    size,
  } = properties

  return (aggregator: InputMask, maskPiece: InputPart, index: number) : InputMask => {

    if (maskPiece.hasOwnProperty('validators')) {
      maskPiece = maskPiece as TextInputPartObjects
      if (maskPiece.validators) {
        nestedValidators[index] = maskPiece.validators
        delete maskPiece.validators
      }
    }

    switch (maskPiece.type) {
      default:
        const inputMaskPiece : TextInputPartObjects = maskPiece as TextInputPartObjects,
          inputKeyMap = {
            ...keyMap,
          } //Unless this is done the keyMap will be shared among various input instances
        allowCopyPaste(inputKeyMap)

        inputMaskPiece.data = {
          ...data,
          ...inputMaskPiece.data,
          index: index.toString()
        }
        inputMaskPiece.id = inputMaskPiece.id ?? id + '-' + index        
        inputMaskPiece.instance = inputMaskPiece.instance ?? {ref: undefined}
        inputMaskPiece.keyMap = {
          ...inputKeyMap,
          ...inputMaskPiece.keyMap
        }

        // This is needed as type=number does not expose selectionStart and selectionEnd properties required for input cluster functionality
        inputMaskPiece.type = (inputMaskPiece.type === INPUT_TYPE_NUMBER) ? INPUT_TYPE_TEL : inputMaskPiece.type

        lastDynamicPart = inputMaskPiece
    }
    return aggregator
  }
}