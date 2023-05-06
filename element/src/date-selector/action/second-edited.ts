import {
  noop,
} from 'svelte/internal'

import {
  DATE_PART__SECOND,
  DateSelectorDisplayStore,
} from '../types.js'

export function prepareSecondEdited(store: DateSelectorDisplayStore, callback: () => void = noop) : (event: Event) => void {
  return (event: Event) : void => {
    const target = event.target as HTMLInputElement
    store.setSelectedDatePart(DATE_PART__SECOND, parseInt(target.value))
    callback()
  }
}