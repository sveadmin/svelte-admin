import type {
  ValueHelperStore,
  SuggestionStore,
} from '../types.js'

export function prepareFocus(
  clearValueOnInit: boolean,
  generateSuggestions: (value?: string | number | null) => Array<string | null>,
  valueHelper: ValueHelperStore,
  suggestions: SuggestionStore,
) {
  return () : void => {
    valueHelper.inputFocused = true
    valueHelper.original = valueHelper.value
    if (clearValueOnInit) {
      valueHelper.current = null
    }
    suggestions.list = generateSuggestions(valueHelper.current)
  }
}