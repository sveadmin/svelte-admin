import {
  CONTROL_INPUT_TYPE_BUTTON,
  CONTROL_INPUT_TYPE_RESET,
  CONTROL_INPUT_TYPE_SUBMIT,
} from '$lib/types.js'

import {
  wrapOnBlur,
  wrapOnChange,
  wrapOnError,
  wrapOnFocus,
  wrapOnInit,
  wrapOnInput,
  wrapOnKeyPress,
  wrapOnMouseAction,
} from '$lib/helper/index.js'

import type {
  ButtonInputProps
} from '$lib/button/index.js'

import {
  preparePushExtraCharactersToNext,
  INPUT_TYPE_NUMBER,
  INPUT_TYPE_TEL,
} from '$lib/input/index.js'

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
  InputMask,
  InputPart,
  TextInputPartObjects,
} from '$lib/text-input/index.js'

import {
  addCopyPaste,
  prepareParsePastedValue,
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
    switch (maskPiece.type) {
      case TEXT_DISPLAY_TYPE_LITERAL:
        const literalEditorConfig = maskPiece.editor as EditorPartLiteral
        if (literalEditorConfig
          && literalEditorConfig.borderless) {
          attachParts()
        }
        maskPiece.size = maskPiece.size ?? size
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
        maskPiece.size = maskPiece.size ?? size
        break
      case CONTROL_INPUT_TYPE_BUTTON:
      case CONTROL_INPUT_TYPE_RESET:
      case CONTROL_INPUT_TYPE_SUBMIT:
        const buttonMaskPiece : TextInputPartObjects = maskPiece as ButtonInputProps
        if (attachNext) {
          buttonMaskPiece.isAttachedOnLeft = true
          attachNext = false
        }
        buttonMaskPiece.id = buttonMaskPiece.id ?? id + '-' + index
        buttonMaskPiece.size = buttonMaskPiece.size ?? size
        break
      default:
        const inputMaskPiece : TextInputPartObjects = maskPiece as TextInputPartObjects,
          inputKeyMap = {
            ...keyMap,
          }
        // const parsePastedValue = prepareParsePastedValue(
        //   inputMaskPiece.allowedKeys,
        //   inputMaskPiece.allowedSeparators,
        // )
        addCopyPaste(inputKeyMap)
        inputMaskPiece.keyMap = {
          ...inputKeyMap,
          ...inputMaskPiece.keyMap
        }

        inputMaskPiece.id = inputMaskPiece.id ?? id + '-' + index        
        if (attachNext) {
          inputMaskPiece.isAttachedOnLeft = true
          attachNext = false
        }
        if (onBlur) {
          const elementOnBlur = inputMaskPiece.onBlur
          inputMaskPiece.onBlur = wrapOnBlur(onBlur, elementOnBlur)
        }
        if (onChange) {
          const elementOnChange = inputMaskPiece.onChange
          inputMaskPiece.onChange = wrapOnChange(onChange, elementOnChange)
        }
        if (onError) {
          const elementOnError = inputMaskPiece.onError
          inputMaskPiece.onError = wrapOnError(onError, elementOnError)
        }
        if (onFocus) {
          const elementOnFocus = inputMaskPiece.onFocus
          inputMaskPiece.onFocus = wrapOnFocus(onFocus, elementOnFocus)
        }
        if (onInit) {
          const elementOnInit = inputMaskPiece.onInit
          inputMaskPiece.onInit = wrapOnInit(onInit, elementOnInit)
        }
        const elementOnInput = wrapOnInput(
          preparePushExtraCharactersToNext(inputMaskPiece.allowedKeys, inputMaskPiece.allowedSeparators),
          inputMaskPiece.onInput
        )
        inputMaskPiece.onInput = (onInput)
          ? inputMaskPiece.onInput = wrapOnInput(onInput, elementOnInput)
          : elementOnInput

        if (onKeyDown) {
          const elementOnKeyDown = inputMaskPiece.onKeyDown
          inputMaskPiece.onKeyDown = wrapOnKeyPress(onKeyDown, elementOnKeyDown)
        }
        if (onKeyUp) {
          const elementOnKeyUp = inputMaskPiece.onKeyUp
          inputMaskPiece.onKeyUp = wrapOnKeyPress(onKeyUp, elementOnKeyUp)
        }

        if (onMouseDown) {
          const elementOnMouseDown = inputMaskPiece.onMouseDown
          inputMaskPiece.onMouseDown = wrapOnMouseAction(onMouseDown, elementOnMouseDown)
        }
        if (onMouseUp) {
          const elementOnMouseUp = inputMaskPiece.onMouseUp
          inputMaskPiece.onMouseUp = wrapOnMouseAction(onMouseUp, elementOnMouseUp)
        }

        inputMaskPiece.instance = inputMaskPiece.instance ?? {ref: undefined}
        inputMaskPiece.size = inputMaskPiece.size ?? size
        // This is needed as type=number does not expose selectionStart and selectionEnd propertied required for input cluster functionality
        inputMaskPiece.type = (inputMaskPiece.type === INPUT_TYPE_NUMBER) ? INPUT_TYPE_TEL : inputMaskPiece.type

        lastDynamicPart = inputMaskPiece
    }
    return aggregator
  }
}