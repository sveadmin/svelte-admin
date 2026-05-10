import {
  defaultComponents,
} from '$lib/component/index.js'

import DropdownSearch from './dropdown-search.svelte'

import {
  COMPONENT_DROPDOWN_SEARCH,
} from './types.js'

export {
  DropdownSearch
}

export { renderCurrentValueDefault } from './render-current-value.svelte'
export { renderSuggestionDefault } from './render-suggestion.svelte'

export * from './types.js'
export * from './helper/index.js'

defaultComponents.add(
  COMPONENT_DROPDOWN_SEARCH,
  DropdownSearch
)