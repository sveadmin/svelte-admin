import {
  createFieldValidator,
  equalLengthValidator,
  rune,
} from '@sveadmin/common'

import type{
  Rune,
} from '@sveadmin/common'

import {
  TEXT_INPUT_TYPE_TEXT,
} from '$lib/types.js'

import type {
  AllowedSize,
} from '$lib/types.js'

import {
  addCopyPaste,
  allowInputKeys,
  prepareParsePastedValue,
  preparePushExtraCharactersToNext,
} from '$lib/input-cluster/index.js'

import type {
  TextInputProps,
} from '$lib/text-input/index.js'

import { keyMap } from './credit-card-key-map.js'

export function creditCardQuartetGenerator (
  boundValue: Rune<string[]>,
  size?: AllowedSize,
  allowedInputKeys: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  inputLength: number[] = [4, 4, 4, 4],
) : TextInputProps {
  const inputKeyMap = {...keyMap}
  const parsePastedValue = prepareParsePastedValue(
    boundValue,
    allowedInputKeys,
    inputLength
  )
  const pushExtraCharactersToNext = preparePushExtraCharactersToNext(boundValue, 4)

  addCopyPaste(inputKeyMap, parsePastedValue)
  allowInputKeys(inputKeyMap, allowedInputKeys, pushExtraCharactersToNext)

  return {
    keyMap: inputKeyMap,
    placeholder: '1234',
    size,
    validateWhileTyping: false,
    validators: createFieldValidator([equalLengthValidator({base: 4})]),
    visibleWidth: '3.25ch',
    type: TEXT_INPUT_TYPE_TEXT,
  }
}