import { NumberFunction } from '../types.js'

export function lessThanValidator (base: number | NumberFunction | Date ) {
  return function (value: number | Date | string) : boolean | string {
    let currentBase = (typeof base === 'function') ? base() : base
    if (typeof currentBase === 'undefined'
        || currentBase === null) {
      return true
    }
    if (value instanceof Date) {
      return (currentBase instanceof Date && value.getTime() < currentBase.getTime())
        || 'Date is not earlier than required'
    }
    value = parseFloat(value + '')
    currentBase = parseFloat(currentBase + '')

    return (!isNaN(value)
      && !isNaN(currentBase)
      && value > currentBase)
      || 'Value is not less than ' + currentBase
  }
}