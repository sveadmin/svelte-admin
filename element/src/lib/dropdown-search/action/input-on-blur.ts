import type {
  OptionStore,
  ValueHelperStore,
} from '$lib/types.js'

export function prepareInputOnBlur (
  setValue: (newValue: string| number | null) => boolean,
  valueHelper: ValueHelperStore,
  valueStore: OptionStore,
  callback?: (event?: Event) => void,
) : (event?: Event) => void {

  return (event?: Event) => {
    if (valueHelper.suggestionSelectionInProgress) {
      valueHelper.suggestionSelectionInProgress = false
      return
    }
  
    valueHelper.search = valueHelper.current?.toString() ?? null
    if (valueHelper.current
      && !valueStore.optionsByValue.get(valueHelper.current.toString())) {
      valueHelper.current = valueStore.options.find(v => v.value === valueHelper.current)?.value ?? null
    }

    // This triggers when the user clicks outside of the input
    setValue((Array.isArray(valueHelper.current)
      ? valueHelper.current.join('')
      : valueHelper.current))
  console.log('%%%%%%%%%%%%%%', JSON.stringify(valueHelper))
    valueHelper.inputFocused = false
    if (callback) {
      callback(event)
    }
  }
}