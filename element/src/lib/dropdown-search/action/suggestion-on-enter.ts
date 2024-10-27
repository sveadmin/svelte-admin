import type {
  SuggestionStore,
} from '../types.js'

export function prepareSuggestionOnEnter (
  setValue: (value: string | null) => boolean,
  suggestions: SuggestionStore,
  focusNext: () => void
) {
  return function (event: Event) : boolean {
    const target = event.target as HTMLInputElement
    const value = suggestions.list[suggestions.selected] || target.value
    if (setValue(value)) {
      focusNext()
    }
    return true
  }
}