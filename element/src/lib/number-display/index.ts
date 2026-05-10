import {
  defaultComponents,
} from '$lib/component/index.js'

import NumberDisplay from './number-display.svelte'
import NumberDisplayWrapped from './number-display-wrapped.svelte'

import {
  COMPONENT_NUMBER_DISPLAY,
  COMPONENT_NUMBER_DISPLAY_WRAPPED,
} from './types.js'

export {
  NumberDisplay,
  NumberDisplayWrapped,
}
export * from './types.js'
export * from './helper/index.js'

defaultComponents.add(
  COMPONENT_NUMBER_DISPLAY,
  NumberDisplay
)

defaultComponents.add(
  COMPONENT_NUMBER_DISPLAY_WRAPPED,
  NumberDisplayWrapped
)