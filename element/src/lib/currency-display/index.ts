import {
  defaultComponents,
} from '$lib/component/index.js'

import CurrencyDisplay from './currency-display.svelte'
import CurrencyDisplayWrapped from './currency-display-wrapped.svelte'

import {
  COMPONENT_CURRENCY_DISPLAY,
  COMPONENT_CURRENCY_DISPLAY_WRAPPED,
} from './types.js'

export {
  CurrencyDisplay,
  CurrencyDisplayWrapped,
}
export * from './types.js'

defaultComponents.add(
  COMPONENT_CURRENCY_DISPLAY,
  CurrencyDisplay
)

defaultComponents.add(
  COMPONENT_CURRENCY_DISPLAY_WRAPPED,
  CurrencyDisplayWrapped
)