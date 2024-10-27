import type {
  ValueHelperStore,
} from '../types.js'

export function prepareInit(
  setFocus: boolean,
  focus: () => void,
  valueHelper: ValueHelperStore,
  getDisplayValue: (value: string | number | null) => string | null,
) {
  return (el: HTMLElement) => {
    if (setFocus) {
      el.focus()
      focus()
    }
    valueHelper.display = getDisplayValue(valueHelper.value)
  }
}