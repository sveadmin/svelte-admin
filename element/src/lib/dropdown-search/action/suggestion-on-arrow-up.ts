import type {
  SuggestionStore,
} from '../types.js'

export function prepareSuggestionOnArrowUp (
  suggestions: SuggestionStore
) {
  return function (event: Event) {
    suggestions.selected -= 1;
    if (suggestions.selected < 0) {
      suggestions.selected = suggestions.list.length - 1
    }
    return false
  }
}