import type {
  ValueHelperStore,
} from '$lib/types.js'

export function prepareSuggestionOnClick (
  valueHelper: ValueHelperStore, 
  focusNext: () => void
) {
  return (event: Event) : void => {
    if (event instanceof MouseEvent
      && event.button !== 0
    ) {
      return
    }
    const target = event.target as HTMLInputElement
    if (valueHelper.inputFocused) {
      valueHelper.current = valueHelper.display
    }
    valueHelper.key = target?.dataset?.id ?? ''
    if (valueHelper.key
      && !valueHelper.display) {
      valueHelper.display = valueHelper.key
    }
    if (!valueHelper.key) { // Clearing the input
      valueHelper.display = ''
      valueHelper.current = ''
    }
    valueHelper.inputFocused = false
    valueHelper.suggestionSelectionInProgress = false
    focusNext()
  }
}