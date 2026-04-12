import type {
  IsValid,
} from '@sveadmin/common'

import type {
  OptionStore,
  ValueHelperStore,
} from '$lib/types.js'

export function prepareSetCaseCorrectValue(
  valueStore: OptionStore,
  valueHelper: ValueHelperStore,
) {

  return (isValid: IsValid) : string | number | null => {
    if (!valueStore.getOption(valueHelper.key)) {
      valueHelper.key = valueStore.getKeyByValue(isValid.validatedValue?.[0])
    }
    valueHelper.value = valueStore.getValue(valueHelper.key)
    if (valueHelper.value === '') {
      valueHelper.current = ''
    }

    return valueHelper.value
  }
}