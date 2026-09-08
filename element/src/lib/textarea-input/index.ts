import {
  defaultComponents,
} from '$lib/component/index.js'

import TextareaInput from './textarea-input.svelte'
// import TextInputWrapped from './text-display-wrapped.svelte'

import {
  COMPONENT_TEXTAREA_INPUT,
  COMPONENT_TEXTAREA_INPUT_WRAPPED,
} from './types.js'

export {
  TextareaInput,
  // TextareaInputWrapped,
}

export * from './types.js'

defaultComponents.add(
  COMPONENT_TEXTAREA_INPUT,
  TextareaInput
)

// defaultComponents.add(
//   COMPONENT_TEXTAREA_INPUT_WRAPPED,
//   TextDisplayWrapped
// )