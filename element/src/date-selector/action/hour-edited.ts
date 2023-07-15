import {
  noop,
} from 'svelte/internal'

import {
  DATE_PART__HOUR,
  DateSelectorDisplayStore,
} from '../types.js'

export function prepareHourEdited(store: DateSelectorDisplayStore, callback: () => void = noop) : (event: Event) => void {
  return (event: Event) : void => {
    const target = event.target as HTMLInputElement
    store.setSelectedDatePart(DATE_PART__HOUR, parseInt(target.value))
    callback()
  }
}