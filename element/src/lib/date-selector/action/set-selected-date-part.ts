import {
  Writable,
} from 'svelte/store'

import {
  DATE_PART__DAY,
  DATE_PART__HOUR,
  DATE_PART__MINUTE,
  DATE_PART__MONTH,
  DATE_PART__SECOND,
  DATE_PART__YEAR,
  DatePart,
  DateSelectorDisplayData,
} from '../types.js'

export function prepareSetSelectedDatePart(store: Writable<DateSelectorDisplayData>, updateDateParts) : (part: DatePart, newValue: number) => void {
  const { update } = store

  return (part: DatePart, newValue: number) : void => {
    update(currentValue => {
      if (!currentValue.selected) {
        currentValue.selected = new Date()
      }
      switch (part) {
        case DATE_PART__DAY:
          currentValue.selected.setUTCDate(newValue)
          break
        case DATE_PART__HOUR:
          currentValue.selected.setUTCHours(newValue)
          break
        case DATE_PART__MINUTE:
          currentValue.selected.setUTCMinutes(newValue)
          break
        case DATE_PART__MONTH:
          currentValue.selected.setUTCMonth(newValue)
          break
        case DATE_PART__SECOND:
          currentValue.selected.setUTCSeconds(newValue)
          break
        case DATE_PART__YEAR:
          newValue = (newValue < 100 && newValue > 0) ? newValue + 2000 : newValue
          currentValue.selected.setUTCFullYear(newValue)
          break
      }
      currentValue = updateDateParts(currentValue)
      return currentValue
    })
  }
}