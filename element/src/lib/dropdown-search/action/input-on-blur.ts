import type {
  OptionStore,
  ValueHelperStore,
} from '$lib/types.js'

export function prepareInputOnBlur (
  valueHelper: ValueHelperStore,
  options: OptionStore,
  callback?: (event?: Event) => void,
) : (event?: Event) => boolean {
  return (event?: Event) : boolean => {
    if (valueHelper.suggestionSelectionInProgress) {
      valueHelper.suggestionSelectionInProgress = false
      return true
    }
    valueHelper.inputFocused = false

    // This is needed to autocomplete the dropdown if someone types in an ID and presses TAB
    if (valueHelper.display
      && !valueHelper.key
    ) {
      const displayString = (Array.isArray(valueHelper.display))
        ? valueHelper.display.join('')
        : valueHelper.display || undefined

      valueHelper.key = options.getKeyByValue(displayString)
    }

    //This can happen when the person clears the input field and clicks out
    // Clearing the input field is only possibnle by pressing Enter
    if (!valueHelper.display
      && valueHelper.key) {
      valueHelper.display = valueHelper.key
    }

    if (callback) {
      callback(event)
    }
    return true
  }
}