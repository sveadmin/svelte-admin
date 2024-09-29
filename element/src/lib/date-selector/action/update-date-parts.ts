import {
  DateSelectorDisplayData,
} from '../types.js'

import dateFormat from 'dateformat'

/**
 * This controls what is the selected vallue in the popup calendar
 */
export function prepareUpdateDateParts(validate, format: string) : (currentValue: DateSelectorDisplayData) => DateSelectorDisplayData {
  return (currentValue: DateSelectorDisplayData) : DateSelectorDisplayData => {
    const isValid = validate({value: currentValue.selected})
    if (!isValid.valid) {
      currentValue.selected = new Date()
    }
    currentValue.selectedYear = currentValue.selected.getUTCFullYear()
    currentValue.selectedMonth = currentValue.selected.getUTCMonth() + 1
    currentValue.displaySelected = dateFormat(currentValue.selected, format)
    currentValue.displaySelectedUTC = dateFormat(
      new Date(
        currentValue.selected.getTime()
        + currentValue.selected.getTimezoneOffset() * 60000
      ),
      format
    )
    currentValue.selectedHour = currentValue.selected.getUTCHours()
    currentValue.selectedMinute = currentValue.selected.getUTCMinutes()

    return currentValue
  }
}