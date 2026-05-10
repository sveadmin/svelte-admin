import {
  defaultComponents,
} from '$lib/component/index.js'

import CountrySelector from './country-selector.svelte'
import FlagInput from './flag-input.svelte'

import {
  COMPONENT_COUNTRY_SELECTOR,
  COMPONENT_FLAG_INPUT
} from './types.js'

export {
  CountrySelector,
  FlagInput,
}

export { renderCurrentValueFlag } from './render-current-value-flag.svelte'
export { renderSuggestionCountry } from './render-suggestion-country.svelte'
export { renderSuggestionFlag } from './render-suggestion-flag.svelte'

export * from './config/index.js'
export * from './helper/index.js'
export * from './types.js'

defaultComponents.add(
  COMPONENT_COUNTRY_SELECTOR,
  CountrySelector
)

defaultComponents.add(
  COMPONENT_FLAG_INPUT,
  FlagInput
)