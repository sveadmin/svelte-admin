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
  COMPONENT_TEXT_INPUT,
} from '$lib/text-input/index.js'

import type {
  ComponentTextInput,
  TextInputProps,
} from '$lib/text-input/index.js'

import { keyMap } from './credit-card-key-map.js'

export function creditCardQuartetGenerator (options?: TextInputProps) : ComponentTextInput
{
  // This is needed in order to not mix the different keyMap definistion which are pulled form the same base
  const inputKeyMap = {
    ...keyMap,
  }

  return {
    input: {
      config: {
        allowedKeys: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        maximumLength: 4, 
        keyMap: inputKeyMap,
        placeholder: '1234',
        isValidationPerformedWhileTyping: false,
        validators: createFieldValidator([equalLengthValidator({base: 4})]),
        visibleWidth: '3.25ch',
        ...options
      }
    },
    type: COMPONENT_TEXT_INPUT,
  }
}