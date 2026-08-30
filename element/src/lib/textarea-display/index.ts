import {
  defaultComponents,
} from '$lib/component/index.js'

import TextareaDisplay from './textarea-display.svelte'
// import TextDisplayWrapped from './text-display-wrapped.svelte'

import {
  COMPONENT_TEXTAREA_DISPLAY,
  COMPONENT_TEXTAREA_DISPLAY_WRAPPED,
} from './types.js'

export {
  TextareaDisplay,
  // TextareaDisplayWrapped,
}

export * from './types.js'

defaultComponents.add(
  COMPONENT_TEXTAREA_DISPLAY,
  TextareaDisplay
)

// defaultComponents.add(
//   COMPONENT_TEXT_DISPLAY_WRAPPED,
//   TextDisplayWrapped
// )