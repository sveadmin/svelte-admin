import {
  noop,
} from 'svelte/internal'

import {
  DATE_PART__MONTH,
  DateSelectorDisplayStore,
} from '../types.js'

export function prepareMonthEdited(store: DateSelectorDisplayStore, callback: () => void = noop) : (event: Event) => void {
  return (event: Event) : void => {
    const target = event.target as HTMLInputElement
    store.setSelectedDatePart(DATE_PART__MONTH, parseInt(target.value) - 1)
    callback()
  }
}