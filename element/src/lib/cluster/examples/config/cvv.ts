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

import type {
  TextInputProps,
} from '$lib/text-input/index.js'

export const cvvGenerator = (
  size?: AllowedSize,
) : TextInputProps => {
  return {
    placeholder: 'CVV',
    size,
    isValidationPerformedWhileTyping: false,
    validators: createFieldValidator([equalLengthValidator({base: 3})]),
    visibleWidth: '2.5ch',
    type: TEXT_INPUT_TYPE_TEXT,
  }
}