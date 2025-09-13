import type {
  ValueHelperStore,
} from '$lib/types.js'

export function prepareSuggestionOnClick (
  valueHelper: ValueHelperStore, 
  setValue: (value: string | null) => boolean,
  focusNext: () => void
) {
  return (event: Event) : void => {
    const target = event.target as HTMLInputElement
    valueHelper.current = valueHelper.display

    const newValue = target?.dataset?.id ?? null

    if (setValue(newValue)) {
      focusNext()
    }
    valueHelper.inputFocused = false
    valueHelper.suggestionSelectionInProgress = false
    if (newValue === null) {
      valueHelper.current = null
    }
  }
}