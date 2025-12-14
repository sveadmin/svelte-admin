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

console.log(event?.target?.id)

    const toCheck = (Array.isArray(newValue)
      ? newValue.join('') ?? ''
      : newValue ?? '')
    if (newValue
      && !valueStore.getOption(toCheck)) {
      //TODO: check how this behaves with array, it may not work as intended
      newValue = valueStore.options.find(v => v.value === toCheck)?.value ?? null
    }

    valueHelper.inputFocused = false

    if (newValue === null) {
      valueHelper.display = valueStore.getDisplayValue(valueHelper.value)
      return
    }

    // This triggers when the user clicks outside of the input
    if(!setValue(toCheck)) {
      return
    }
    if (callback) {
      callback(event)
    }
  }
}