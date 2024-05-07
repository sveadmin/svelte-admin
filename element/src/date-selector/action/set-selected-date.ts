import {
  Writable,
} from 'svelte/store'

import {
  DateSelectorDisplayData
} from '../types.js'

import {
  updateDisplayStrings,
} from './update-display-strings.js'

export function prepareSetSelectedDate(store: Writable<DateSelectorDisplayData>, updateDateParts) : (date: Date | null) => void {
  const { update } = store

  return (date: Date | null) : void => {
    update(currentValue => {
      currentValue.selected = date
      currentValue = updateDateParts(currentValue)
      return currentValue
    })
  }
}