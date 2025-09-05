import type {
  ChangeValueProps,
} from '../types.js'

export const prepareSetValue = (parameters: ChangeValueProps) => {
  const {
    clearValueOnInit,
    onChange,
    getDisplayValue,
    validateValue,
    valueHelper,
  } = parameters

  return (newValue: string| number | null) : boolean => {
    if (valueHelper.original !== newValue
      // || valueHelper.current !== newValue //This can happen when typing in to narrow results
      || clearValueOnInit) {
      if (!validateValue(newValue)) {
        return false
      }
      valueHelper.current = valueHelper.display = getDisplayValue(newValue)
      valueHelper.value = newValue
    }
    if (typeof onChange === 'function') {
      onChange(valueHelper.value)
    }
    return true
  }
}