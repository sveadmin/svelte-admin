import type {
  ChangeValueProps,
} from '../types.js'

export const prepareSetValue = (parameters: ChangeValueProps) => {
  const {
    onChange,
    options,
    validateValue,
    valueHelper,
  } = parameters

  return (newValue: string| number | null) : boolean => {
    if (!validateValue(newValue)) {
    console.log('> invalid mewValue', newValue)
      return false
    }
    if (valueHelper.original == newValue) {
    console.log('> original == mewValue', newValue)
      const displayValue = options.getDisplayValue(valueHelper.value)

      if (!displayValue) {
        return true
      }
      valueHelper.display = displayValue
      return true
    }
    valueHelper.value = newValue

    if (typeof onChange === 'function') {
      onChange(valueHelper.value)
    }
    return true
  }
}