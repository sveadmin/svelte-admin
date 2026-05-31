import {
  defaultComponents,
} from '$lib/component/index.js'

import DateDisplay from './date-display.svelte'
import DateDisplayWrapped from './date-display-wrapped.svelte'

import {
  COMPONENT_DATE_DISPLAY,
  COMPONENT_DATE_DISPLAY_WRAPPED
} from './types.js'

export {
  DateDisplay
}

export * from './helper/index.js'
export * from './types.js'

defaultComponents.add(COMPONENT_DATE_DISPLAY, DateDisplay)
defaultComponents.add(COMPONENT_DATE_DISPLAY_WRAPPED, DateDisplayWrapped)