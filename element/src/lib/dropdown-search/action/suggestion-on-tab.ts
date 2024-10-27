import type {
  SuggestionStore,
} from '../types.js'

export function prepareSuggestionOnTab (
  suggestions: SuggestionStore
) {
  return function (event: Event) {
    const target = event.target as HTMLInputElement
    suggestions.selected = parseInt(target.dataset.id ?? '1') - 1
    return false
  }
}