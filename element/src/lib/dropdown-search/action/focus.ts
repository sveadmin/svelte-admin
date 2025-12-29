import type {
  ValueHelperStore,
} from '$lib/types.js'

import type {
  SuggestionStore,
} from '../types.js'

export function prepareFocus(
  clearValueOnInit: boolean,
  generateSuggestions: (value?: string | number | null) => Array<string | null>,
  valueHelper: ValueHelperStore,
  suggestions: SuggestionStore,
) : (event?: Event) => boolean {
  return (event?: Event) : boolean => {
    valueHelper.inputFocused = true
    valueHelper.original = valueHelper.key
    valueHelper.display = (clearValueOnInit)
      ? null
      : valueHelper.current?.toString() || valueHelper.value?.toString() || ''
    suggestions.list = generateSuggestions(valueHelper.display)
    suggestions.selected = suggestions.list.indexOf(valueHelper.key ?? null)
    return true
  }
}