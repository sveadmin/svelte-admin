import {
  KEY_ALLOWED_KEYS,
  CONTROL_INPUT_TYPE_BUTTON,
  CONTROL_INPUT_TYPE_RESET,
  CONTROL_INPUT_TYPE_SUBMIT,
} from '$lib/types.js'

import {
  TEXT_DISPLAY_TYPE_LITERAL,
} from '$lib/literal/index.js'

import {
  COMPONENT_IMAGE,
} from '$lib/image/index.js'


import {
  preparePushExtraCharactersToNext,
  INPUT_TYPE_NUMBER,
  INPUT_TYPE_TEL,
} from '$lib/input/index.js'

import type {
  InputMask,
  InputPart,
  TextInputPartObjects,
} from '$lib/text-input/index.js'

import type { MaskKeyMapReducerProps } from '../types.js'

import {
  addCopyPaste,
  prepareParsePastedValue,
} from '../action/index.js'

export const prepareMaskKeyMapReducer = (properties: MaskKeyMapReducerProps) => 
{
  const {
    inputLength,
    keyMap,
    valueParts,
  } = properties

  return (aggregator: InputMask, maskPiece: InputPart, index: number) : InputMask => {
    aggregator.push(maskPiece)

    if (typeof maskPiece === 'string') {
      return aggregator
    }
    switch (maskPiece.type) {
      case TEXT_DISPLAY_TYPE_LITERAL:
      case COMPONENT_IMAGE:
      case CONTROL_INPUT_TYPE_BUTTON:
      case CONTROL_INPUT_TYPE_RESET:
      case CONTROL_INPUT_TYPE_SUBMIT:
        break
      default:
        const inputMaskPiece : TextInputPartObjects = maskPiece as TextInputPartObjects
        // This is needed as tpye=number does not expose selectionStart and selectionEnd propertied required for input cluster functionality
        inputMaskPiece.type = (inputMaskPiece.type === INPUT_TYPE_NUMBER) ? INPUT_TYPE_TEL : inputMaskPiece.type

        const inputKeyMap = {
          ...keyMap,
        }

        if (inputMaskPiece?.characterLimit) {
          inputKeyMap[KEY_ALLOWED_KEYS] = preparePushExtraCharactersToNext(valueParts, inputMaskPiece.characterLimit)
        }


        const parsePastedValue = prepareParsePastedValue(
          valueParts,
          inputMaskPiece.allowedKeys,
          inputMaskPiece.allowedSeparators,
          inputLength
        )
        addCopyPaste(inputKeyMap, parsePastedValue)
        inputMaskPiece.keyMap = {
          ...inputKeyMap,
          ...inputMaskPiece.keyMap
        }
        // aggregator.push(inputMaskPiece)
    }
    return aggregator
  }
}