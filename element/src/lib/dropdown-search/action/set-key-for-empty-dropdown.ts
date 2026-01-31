import type {
  OptionStore,
  ValueHelperStore,
} from '$lib/types.js'

export function prepareSetKeyForEmptyDropdown(
  valueStore: OptionStore,
  valueHelper: ValueHelperStore,
) {
  return () : string | number | null => {
    const displayString = (Array.isArray(valueHelper.display))
      ? valueHelper.display.join('')
      : valueHelper.display || undefined

    const newKey = valueStore.getKeyByValue(displayString)
    if (!valueHelper.key) {
      if (newKey) {
        valueHelper.key = newKey ?? undefined
        valueHelper.value = valueStore.getValue(valueHelper.key)
      } else {
        valueHelper.key = displayString
        valueHelper.value = displayString ?? ''
      }
      valueHelper.original = valueHelper.key
      valueHelper.current = valueHelper.value
    }

    return valueHelper.value
  }
}