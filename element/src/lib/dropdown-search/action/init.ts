import type {
  ValueHelperStore,
} from '../types.js'

export function prepareInit(
  valueHelper: ValueHelperStore,
  getDisplayValue: (value: string | number | null) => string | null,
) {
  return (el: HTMLElement) => {
    valueHelper.display = getDisplayValue(valueHelper.value)
  }
}