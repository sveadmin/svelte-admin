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
    valueHelper.search = valueHelper.current?.toString() ?? null

    if (setValue(target?.dataset?.id ?? null)) {
      focusNext()
    }
    valueHelper.inputFocused = false
    valueHelper.suggestionSelectionInProgress = false
  }
}