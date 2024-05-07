import {
  get,
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

export function preapreGetByDatePart(store: Writable<DateSelectorDisplayData>) : (part: DatePart) => string {
  return (part: DatePart) : string => {
    const {
      displayDay,
      displayHour,
      displayMinute,
      displayMonth,
      displaySecond,
      displayYear,
    } = get(store)
    
    switch (part) {
      case DATE_PART__DAY:
        return displayDay
      case DATE_PART__HOUR:
        return displayHour
      case DATE_PART__MINUTE:
        return displayMinute
      case DATE_PART__MONTH:
        return displayMonth
      case DATE_PART__SECOND:
        return displaySecond
      case DATE_PART__YEAR:
        return displayYear
    }
    return ''
  }
}