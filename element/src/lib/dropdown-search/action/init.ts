import type {
  OptionStore,
  ValueHelperStore,
} from '$lib/types.js'

export function prepareInit(
  valueHelper: ValueHelperStore,
  options: OptionStore
) {
  return (el: HTMLElement) => {
    valueHelper.display = options.getDisplayValue(valueHelper.value)
  }
}