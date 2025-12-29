import PhonePrefixSelector from './phone-prefix-selector.svelte'
import FlagInput from './prefix-flag-input.svelte'

export {
  PhonePrefixSelector,
  FlagInput,
}

export { renderCurrentValuePrefix } from './render-current-value-prefix.svelte'
export { renderSuggestionFlag } from './render-suggestion-flag.svelte'
export { renderSuggestionPrefix } from './render-suggestion-prefix.svelte'

export * from './config/index.js'
export * from './types.js'