import {
  createFieldValidator,
  equalLengthValidator,
} from '@sveadmin/common'

import {
  TEXT_INPUT_TYPE_TEXT,
} from '$lib/types.js'

import type {
  AllowedSize,
} from '$lib/types.js'

import {
  addCopyPaste,
  prepareParsePastedValue,
} from '$lib/input-cluster/index.js'

import type {
  TextInputProps,
} from '$lib/text-input/index.js'

import { keyMap } from './credit-card-key-map.js'

export function creditCardQuartetGenerator (
  size?: AllowedSize,
  allowedKeys: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  separators: string[] = ['-'],
) : TextInputProps {
  const inputKeyMap = {
    ...keyMap,
  }
  const parsePastedValue = prepareParsePastedValue(
    allowedKeys,
    separators,
  )
  addCopyPaste(inputKeyMap, parsePastedValue)

  return {
    allowedKeys,
    maximumLength: 4, 
    keyMap: inputKeyMap,
    placeholder: '1234',
    size,
    validateWhileTyping: false,
    validators: createFieldValidator([equalLengthValidator({base: 4})]),
    visibleWidth: '3.25ch',
    type: TEXT_INPUT_TYPE_TEXT,
  }
}