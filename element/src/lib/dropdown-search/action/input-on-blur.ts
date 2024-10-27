import type {
  ValueHelperStore,
} from '../types.js'

export function preparepInputOnBlur (
  setValue: (newValue: string| number | null) => boolean,
  valueHelper: ValueHelperStore,
) {

  return () => {
    // This triggers when the user clicks outside of the input
    setValue((valueHelper.current) ? valueHelper.current : valueHelper.original)
    valueHelper.inputHideTimeout = setTimeout(() => valueHelper.inputFocused = false, 100)
  }
}