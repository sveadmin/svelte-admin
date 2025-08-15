import {
  createFieldValidator,
  equalLengthValidator,
} from '@sveadmin/common'

import type{
  Rune,
} from '@sveadmin/common'

import {
  KEY_ALLOWED_KEYS,
  TEXT_INPUT_TYPE_TEXT,
} from '$lib/types.js'

import type {
  AllowedSize,
} from '$lib/types.js'

import {
  preparePushExtraCharactersToNext,
} from '$lib/input/index.js'

import {
  addCopyPaste,
  prepareParsePastedValue,
} from '$lib/input-cluster/index.js'

import type {
  TextInputProps,
} from '$lib/text-input/index.js'

import { keyMap } from './credit-card-key-map.js'

export function creditCardQuartetGenerator (
  boundValue: Rune<string[]>,
  size?: AllowedSize,
  allowedKeys: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  separators: string[] = ['-'],
  inputLength: number[] = [4, 4, 4, 4],
) : TextInputProps {
  const inputKeyMap = {
    ...keyMap,
    [KEY_ALLOWED_KEYS]: preparePushExtraCharactersToNext(boundValue, 4)
  }
  const parsePastedValue = prepareParsePastedValue(
    boundValue,
    allowedKeys,
    separators,
    inputLength
  )
  addCopyPaste(inputKeyMap, parsePastedValue)

  return {
    allowedKeys,
    keyMap: inputKeyMap,
    placeholder: '1234',
    size,
    validateWhileTyping: false,
    validators: createFieldValidator([equalLengthValidator({base: 4})]),
    visibleWidth: '3.25ch',
    type: TEXT_INPUT_TYPE_TEXT,
  }
}