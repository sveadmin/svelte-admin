import type {
  ValueHelperStore,
} from '$lib/types.js'

export function prepareFocus(
  valueHelper: ValueHelperStore,
  callback?: (event?: Event) => void,
) : (event?: Event) => void{
  return (event?: Event) : void => {
    valueHelper.inputFocused = true
    valueHelper.original = valueHelper.value
    if (callback) {
      callback(event)
    }
  }
}