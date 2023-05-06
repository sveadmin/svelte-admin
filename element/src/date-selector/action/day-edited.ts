import {
  noop,
} from 'svelte/internal'

import {
  DATE_PART__DAY,
  DateSelectorDisplayStore,
} from '../types.js'

export function prepareDayEdited(store: DateSelectorDisplayStore, callback: () => void = noop) : (event: Event) => void {
  return (event: Event) : void => {
    const target = event.target as HTMLInputElement
    store.setSelectedDatePart(DATE_PART__DAY, parseInt(target.value))
    callback()
  }
}