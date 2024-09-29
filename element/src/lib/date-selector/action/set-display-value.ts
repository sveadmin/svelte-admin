import {
  Writable,
} from 'svelte/store'

import {
  DateSelectorDisplayData
} from '../types.js'

import {
  updateDisplayStrings,
} from './update-display-strings.js'

export function prepareSetDisplayValue(store: Writable<DateSelectorDisplayData>) : (date: Date) => void {
  const { update } = store

  return (date: Date) : void => {
    update(currentValue => {
      currentValue.displayValue = date
      currentValue = updateDisplayStrings(currentValue)
      return currentValue
    })
  }
}