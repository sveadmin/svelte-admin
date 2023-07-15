import {
  noop,
} from 'svelte/internal'

import {
  DATE_PART__YEAR,
  DateSelectorDisplayStore,
} from '../types.js'

export function prepareYearEdited(store: DateSelectorDisplayStore, callback: () => void = noop) : (event: Event) => void {
  return (event: Event) : void => {
    const target = event.target as HTMLInputElement
    store.setSelectedDatePart(DATE_PART__YEAR, parseInt(target.value))
    callback()
  }
}