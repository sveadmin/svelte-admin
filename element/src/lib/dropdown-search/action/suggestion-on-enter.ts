import type {
  ValueHelperStore
} from '$lib/types.js'

import type {
  SuggestionStore,
} from '../types.js'

export function prepareSuggestionOnEnter (
  setValue: (value: string | null) => boolean,
  suggestions: SuggestionStore,
  valueHelper: ValueHelperStore,
  focusNext: () => void
) {
  return function (event: Event) : boolean {
    const target = event.target as HTMLInputElement
    valueHelper.search = suggestions.list[suggestions.selected] || target.value
    valueHelper.current = suggestions.list[suggestions.selected] || target.value
    valueHelper.suggestionSelectionInProgress = true
    if (setValue(valueHelper.current)) {
      focusNext()
    }
    valueHelper.inputFocused = false
    return false
  }
}