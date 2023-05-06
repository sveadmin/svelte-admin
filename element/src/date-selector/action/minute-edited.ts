import {
  noop,
} from 'svelte/internal'

import {
  DATE_PART__MINUTE,
  DateSelectorDisplayStore,
} from '../types.js'

export function prepareMinuteEdited(store: DateSelectorDisplayStore, callback: () => void = noop) : (event: Event) => void {
  return (event: Event) : void => {
    const target = event.target as HTMLInputElement
    store.setSelectedDatePart(DATE_PART__MINUTE, parseInt(target.value))
    callback()
  }
}