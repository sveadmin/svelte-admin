import type {
  SuggestionStore,
} from '../types.js'

export function prepareSuggestionOnEnd (
  suggestions: SuggestionStore
) {
  return function (event: Event) {
    suggestions.selected = suggestions.list.length - 1
    return false
  }
}