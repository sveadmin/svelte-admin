import {
  DateSelectorDisplayData,
} from '../types.js'

const padWithZero = (timePiece: string) : string => {
  return '0'.substring(0, 2 - timePiece.length) + timePiece
}

export const updateDisplayStrings = (currentValue: DateSelectorDisplayData) : DateSelectorDisplayData => {
  currentValue.displayYear = currentValue.displayValue?.getUTCFullYear()?.toString() ?? ''
  currentValue.displayMonth = (currentValue.displayValue)
    ? padWithZero((currentValue.displayValue.getUTCMonth() + 1).toString())
    : ''
  currentValue.displayDay = (currentValue.displayValue)
    ? padWithZero(currentValue.displayValue.getUTCDate().toString())
    : ''
  currentValue.displayHour = (currentValue.displayValue)
    ? currentValue.displayValue.getUTCHours().toString()
    : ''
  currentValue.displayMinute = (currentValue.displayValue)
    ? padWithZero(currentValue.displayValue.getUTCMinutes().toString())
    : ''
  currentValue.displaySecond = (currentValue.displayValue)
    ? padWithZero(currentValue.displayValue.getUTCSeconds().toString())
    : ''
  return currentValue
}