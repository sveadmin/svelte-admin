import type {
  ValueHelperStore,
} from '$lib/types.js'

export function prepareSuggestionOnEscape (
  setValue: (value: string | number | null) => boolean,
  valueHelper: ValueHelperStore
) {
  return function (event: Event) {
    const target = event.target as HTMLInputElement
    valueHelper.inputFocused = false
    valueHelper.suggestionSelectionInProgress = true
    valueHelper.current = valueHelper.display
    setValue(valueHelper.original)
    target.blur()
    event.stopPropagation()
    return false
  }
}