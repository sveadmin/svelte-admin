import {
  createFieldValidator,
  equalLengthValidator,
  greaterThanOrEqualValidator,
  lessThanOrEqualValidator,
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

import { keyMap } from './ip-address-key-map.js'

export function ipAddressTripletGenerator (
  boundValue: Rune<string[]>,
  isPrimary: boolean = false,
  size?: AllowedSize,
  allowedKeys: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  separators: string[] = ['.'],
  inputLength: number[] = [3, 3, 3, 3],
) : TextInputProps {
  const inputKeyMap = {
    ...keyMap,
    [KEY_ALLOWED_KEYS]: preparePushExtraCharactersToNext(boundValue, 3)
  }
  const parsePastedValue = prepareParsePastedValue(
    boundValue,
    allowedKeys,
    separators,
    inputLength
  )
  addCopyPaste(inputKeyMap, parsePastedValue)

  const validators = createFieldValidator([lessThanOrEqualValidator({base: 255})])
  if (isPrimary) {
    validators.appendValidator(greaterThanOrEqualValidator({base: 1}))
  } else {
    validators.appendValidator(greaterThanOrEqualValidator({base: 0}))
  }


  return {
    allowedKeys,
    keyMap: inputKeyMap,
    placeholder: '255',
    size,
    validateWhileTyping: false,
    validators,
    visibleWidth: '2.25ch',
    type: TEXT_INPUT_TYPE_TEXT,
  }
}