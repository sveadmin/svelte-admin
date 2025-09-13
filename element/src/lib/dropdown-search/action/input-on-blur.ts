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
  
    let newValue = valueHelper.current = valueHelper.display

    if (newValue
      && !valueStore.optionsByValue.get(newValue.toString())) {
      newValue = valueStore.options.find(v => v.value === newValue)?.value ?? null
    }

    // This triggers when the user clicks outside of the input
    setValue((Array.isArray(newValue)
      ? newValue.join('') ?? ''
      : newValue ?? ''))
    valueHelper.inputFocused = false
    if (callback) {
      callback(event)
    }
  }
}