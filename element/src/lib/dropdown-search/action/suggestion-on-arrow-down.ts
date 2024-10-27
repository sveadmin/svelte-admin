import type {
  SuggestionStore,
} from '../types.js'

export function prepareSuggestionOnArrowDown (
  suggestions: SuggestionStore
) {
  return function (event: Event) {
    suggestions.selected += 1;
    if (suggestions.selected >= suggestions.list.length) {
      suggestions.selected = 0
    }
    return false
  }
}