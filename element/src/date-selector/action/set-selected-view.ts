import {
  Writable,
} from 'svelte/store'

import {
  DateSelectorDisplayData,
  DateSelectorView,
} from '../types.js'

export function prepareSetSelectedView(store: Writable<DateSelectorDisplayData>) : (view: DateSelectorView) => void {
  const { update } = store

  return (view: DateSelectorView) : void => {
    update(currentValue => {
      currentValue.selectedView = view
      return currentValue
    })
  }

}