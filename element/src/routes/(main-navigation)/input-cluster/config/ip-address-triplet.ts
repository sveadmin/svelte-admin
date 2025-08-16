import {
  createFieldValidator,
  greaterThanOrEqualValidator,
  lessThanOrEqualValidator,
} from '@sveadmin/common'

import {
  TEXT_INPUT_TYPE_TEXT,
} from '$lib/types.js'

import type {
  AllowedSize,
} from '$lib/types.js'

import type {
  TextInputProps,
} from '$lib/text-input/index.js'

import { keyMap } from './ip-address-key-map.js'

export function ipAddressTripletGenerator (
  isPrimary: boolean = false,
  size?: AllowedSize,
  allowedKeys: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
) : TextInputProps {

  const validators = createFieldValidator([lessThanOrEqualValidator({base: 255})])
  if (isPrimary) {
    validators.appendValidator(greaterThanOrEqualValidator({base: 1}))
  } else {
    validators.appendValidator(greaterThanOrEqualValidator({base: 0}))
  }

  return {
    allowedKeys,
    allowedSeparators: ['.'],
    maximumLength: 3,
    keyMap,
    placeholder: '255',
    size,
    validateWhileTyping: false,
    validators,
    visibleWidth: '2.25ch',
    type: TEXT_INPUT_TYPE_TEXT,
  }
}