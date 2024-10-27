import type {
  ValueHelperStore,
} from '../types.js'

export function prepareSuggestionOnEscape (
  setValue: (value: string | number | null) => boolean,
  valueHelper: ValueHelperStore
) {
  return function (event: Event) {
    const target = event.target as HTMLInputElement
    setValue(valueHelper.original)
    target.blur()
    event.stopPropagation()
    return false
  }
}