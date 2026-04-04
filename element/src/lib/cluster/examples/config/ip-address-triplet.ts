import {
  createFieldValidator,
  greaterThanOrEqualValidator,
  lessThanOrEqualValidator,
} from '@sveadmin/common'

import {
  COMPONENT_TEXT_INPUT,
} from '$lib/text-input/index.js'

import type {
  ComponentTextInput,
  TextInputProps,
} from '$lib/text-input/index.js'

import { keyMap } from './ip-address-key-map.js'

export function ipAddressTripletGenerator (isPrimary: boolean = false, options?: TextInputProps) : ComponentTextInput
{
  // This is needed in order to not mix the different keyMap definistion which are pulled form the same base
  const inputKeyMap = {
    ...keyMap,
  }

  const validators = createFieldValidator([lessThanOrEqualValidator({base: 255})])
  if (isPrimary) {
    validators.appendValidator(greaterThanOrEqualValidator({base: 1}))
  } else {
    validators.appendValidator(greaterThanOrEqualValidator({base: 0}))
  }

  return {
    input: {
      config: {
        allowedKeys: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        allowedSeparators: ['.'],
        isValidationPerformedWhileTyping: false,
        keyMap: inputKeyMap,
        maximumLength: 3, 
        placeholder: '255',
        validators,
        visibleWidth: '2.25ch',
        ...options
      }
    },
    type: COMPONENT_TEXT_INPUT,
  }
}