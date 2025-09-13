import type {
  ChangeValueProps,
} from '../types.js'

export const prepareSetValue = (parameters: ChangeValueProps) => {
  const {
    onChange,
    getDisplayValue,
    validateValue,
    valueHelper,
  } = parameters

  return (newValue: string| number | null) : boolean => {
    if (valueHelper.original !== newValue) {
      if (!validateValue(newValue)) {
        return false
      }
      valueHelper.value = newValue
    }
    valueHelper.display = getDisplayValue(valueHelper.value)
    if (typeof onChange === 'function') {
      onChange(valueHelper.value)
    }
    return true
  }
}