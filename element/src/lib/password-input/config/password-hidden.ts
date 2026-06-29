import {
  TEXT_INPUT_TYPE_PASSWORD,
} from '$lib/types.js'

import {
  COMPONENT_TEXT_INPUT,
} from '$lib/text-input/index.js'

import type {
  ComponentTextInput,
  TextInputProps,
} from '$lib/text-input/index.js'

export function passwordHidden (options?: TextInputProps) : ComponentTextInput
{
  return {
    input: {
      config: {
        isAttachedOnRight: true,
        type: TEXT_INPUT_TYPE_PASSWORD,
        ...options
      }
    },
    type: COMPONENT_TEXT_INPUT,
  }
}