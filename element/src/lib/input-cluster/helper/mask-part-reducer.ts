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
  SveaComponentButton
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
    if (index === 0) {
      attachNext = false
      lastDynamicPart = undefined
    }

    if (maskPiece.hasOwnProperty('validators')) {
      maskPiece = maskPiece as TextInputPartObjects
      if (maskPiece.validators) {
        nestedValidators[index] = maskPiece.validators
        delete maskPiece.validators
      }
    }

    aggregator.push(maskPiece)

    if (typeof maskPiece === 'string') {
      return aggregator
    }

    maskPiece.size = maskPiece.size ?? size
    switch (maskPiece.type) {
      case COMPONENT_LITERAL:
        const literalEditorConfig = maskPiece.display as LiteralDisplayProps
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
        maskPiece.data = {
          ...data,
          ...maskPiece.data,
          index: index.toString()
        }
        break
      case CONTROL_INPUT_TYPE_BUTTON:
      case CONTROL_INPUT_TYPE_RESET:
      case CONTROL_INPUT_TYPE_SUBMIT:
        const buttonMaskPiece : TextInputPartObjects = maskPiece.input.config as SveaComponentButton
        if (attachNext) {
          buttonMaskPiece.isAttachedOnLeft = true
          attachNext = false
        }
        buttonMaskPiece.data = {
          ...data,
          ...buttonMaskPiece.data,
          index: index.toString()
        }
        buttonMaskPiece.id = buttonMaskPiece.id ?? id + '-' + index
        break
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
        if (attachNext) {
          inputMaskPiece.isAttachedOnLeft = true
          attachNext = false
        }
        inputMaskPiece.onBlur = wrapOnEvent(onBlur, inputMaskPiece.onBlur)
        inputMaskPiece.onChange = wrapOnEvent(onChange, inputMaskPiece.onChange)
        inputMaskPiece.onError = wrapOnError(onError, inputMaskPiece.onError)
        inputMaskPiece.onFocus = wrapOnFocus(onFocus, inputMaskPiece.onFocus)
        inputMaskPiece.onInit = wrapOnInit(onInit, inputMaskPiece.onInit)
        const elementOnInput = wrapOnInput(
          preparePushExtraCharactersToNext(inputMaskPiece.allowedKeys, inputMaskPiece.allowedSeparators),
          inputMaskPiece.onInput
        )
        inputMaskPiece.onInput = wrapOnInput(onInput, elementOnInput)
        inputMaskPiece.onKeyDown = wrapOnKeyPress(onKeyDown, inputMaskPiece.onKeyDown)
        inputMaskPiece.keyMap = {
          ...inputKeyMap,
          ...inputMaskPiece.keyMap
        }
        inputMaskPiece.onKeyUp = wrapOnKeyPress(onKeyUp, inputMaskPiece.onKeyUp)
        inputMaskPiece.onMouseDown = wrapOnMouseAction(onMouseDown, inputMaskPiece.onMouseDown)
        inputMaskPiece.onMouseUp = wrapOnMouseAction(onMouseUp, inputMaskPiece.onMouseUp)

        // This is needed as type=number does not expose selectionStart and selectionEnd properties required for input cluster functionality
        inputMaskPiece.type = (inputMaskPiece.type === INPUT_TYPE_NUMBER) ? INPUT_TYPE_TEL : inputMaskPiece.type

        lastDynamicPart = inputMaskPiece
    }
    return aggregator
  }
}