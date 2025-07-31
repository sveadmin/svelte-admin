import type {
  OptionStore
} from '$lib/types.js'

import type {
  ValueHelperStore,
} from '../types.js'

export function prepareInputOnBlur (
  setValue: (newValue: string| number | null) => boolean,
  valueHelper: ValueHelperStore,
  valueStore: OptionStore,
  callback?: (event?: Event) => void,
) : (event?: Event) => void {

  return (event?: Event) => {
    if (valueHelper.suggestionSelectionInProgress) {
      return
    }
  
    if (valueHelper.current
      && !valueStore.optionsById.get(valueHelper.current.toString())) {
      valueHelper.current = valueStore.options.find(v => v.value === valueHelper.current)?.id ?? null
    }

    // This triggers when the user clicks outside of the input
    setValue((valueHelper.current) ? valueHelper.current : valueHelper.value)
    valueHelper.inputFocused = false
    if (callback) {
      callback(event)
    }
  }
}