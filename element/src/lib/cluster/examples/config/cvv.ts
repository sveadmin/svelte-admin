import {
  createFieldValidator,
  equalLengthValidator,
} from '@sveadmin/common'

import {
  COMPONENT_TEXT_INPUT,
} from '$lib/text-input/index.js'

import type {
  ComponentTextInput,
  TextInputProps,
} from '$lib/text-input/index.js'

export const cvvGenerator = (options : TextInputProps = {}) : ComponentTextInput => {
  return {
    input: {
      config: {
        placeholder: 'CVV',
        isValidationPerformedWhileTyping: false,
        validators: createFieldValidator([equalLengthValidator({base: 3})]),
        visibleWidth: '2.5ch',
        ...options
      }
    },
    type: COMPONENT_TEXT_INPUT,
  }
}