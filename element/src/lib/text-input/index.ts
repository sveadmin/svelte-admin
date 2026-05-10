import {
  defaultComponents,
} from '$lib/component/index.js'

import TextInput from './text-input.svelte'
import TextInputWrapped from './text-input-wrapped.svelte'

import {
  COMPONENT_TEXT_INPUT,
  COMPONENT_TEXT_INPUT_WRAPPED,
} from './types.js'

export {
  TextInput,
  TextInputWrapped,
}

export * from './types.js'

defaultComponents.add(
  COMPONENT_TEXT_INPUT,
  TextInput
)

defaultComponents.add(
  COMPONENT_TEXT_INPUT_WRAPPED,
  TextInputWrapped,
)