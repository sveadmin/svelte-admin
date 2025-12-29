import type {
  ValueHelperStore,
} from '$lib/types.js'

export function prepareSuggestionOnEscape (
  valueHelper: ValueHelperStore
) {
  return function (event: Event) {
    const target = event.target as HTMLInputElement
    valueHelper.inputFocused = false
    valueHelper.suggestionSelectionInProgress = true
    valueHelper.current = valueHelper.display
    valueHelper.display = valueHelper.original ?? null
    target.blur()
    event.stopPropagation()
    return false
  }
}