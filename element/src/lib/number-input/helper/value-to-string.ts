import {
  DECIMAL_SEPARATOR_CONVERTER,
} from '../types.js'

export const prepareValueToString = (decimalSeparator: string) : (value: number | null) => string => {
  return function (value: number | null) : string {
    return value?.toString()
      .replace(DECIMAL_SEPARATOR_CONVERTER[decimalSeparator], decimalSeparator) ?? ''
  }
}