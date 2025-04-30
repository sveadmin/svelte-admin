import type {
  ValueHelperStore,
} from '../types.js'

export function prepareSuggestionOnClick (
  valueHelper: ValueHelperStore, 
  setValue: (value: string | null) => boolean,
  focusNext: () => void
) {
  return (event: Event) : void => {
    const target = event.target as HTMLInputElement
    if (setValue(target?.dataset?.id ?? null)) {
      focusNext()
    }
    valueHelper.inputFocused = false
    valueHelper.suggestionSelectionInProgress = false
  }
}