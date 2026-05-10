import {
  defaultComponents,
} from '$lib/component/index.js'

import TextDisplay from './text-display.svelte'
import TextDisplayWrapped from './text-display-wrapped.svelte'

import {
  COMPONENT_TEXT_DISPLAY,
  COMPONENT_TEXT_DISPLAY_WRAPPED,
} from './types.js'

export {
  TextDisplay,
  TextDisplayWrapped,
}

export { renderTextDisplayWrapped } from './render-text-display-wrapped.svelte'

export * from './action/index.js'
export * from './types.js'

defaultComponents.add(
  COMPONENT_TEXT_DISPLAY,
  TextDisplay
)

defaultComponents.add(
  COMPONENT_TEXT_DISPLAY_WRAPPED,
  TextDisplayWrapped
)