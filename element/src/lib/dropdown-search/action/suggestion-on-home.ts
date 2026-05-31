import type {
  SuggestionStore,
} from '../types.js'

export function prepareSuggestionOnHome (
  suggestions: SuggestionStore
) {
  return function (event: Event) {
    suggestions.selected = 0;
    return false
  }
}