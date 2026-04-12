import type {
  ValueHelperStore
} from '$lib/types.js'

import type {
  SuggestionStore,
} from '../types.js'

export function prepareSuggestionOnEnter (
  suggestions: SuggestionStore,
  valueHelper: ValueHelperStore,
  focusNextBound: () => void
) {
  return function (event: Event) : boolean {
    valueHelper.suggestionSelectionInProgress = true
    valueHelper.inputFocused = false
    valueHelper.key = (suggestions.list.hasOwnProperty(suggestions.selected))
      ? suggestions.list[suggestions.selected] ?? undefined
      : (Array.isArray(valueHelper.display)
        ? valueHelper.display.join('')
        : valueHelper.display ?? '')
    // valueHelper.current = valueHelper.display || valueHelper.key
    valueHelper.suggestionSelectionInProgress = false
    focusNextBound()
    return false
  }
}