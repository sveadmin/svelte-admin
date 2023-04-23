import {
  NumberFunction,
} from '../types.js'

export function greaterThanValidator (base: number | NumberFunction | Date ) {
  return function (value: number | Date | string) : boolean | string {
    const currentBase = (typeof base === 'function') ? base() : base
    if (typeof currentBase === 'undefined'
        || currentBase === null) {
      return true
    }
    if (value instanceof Date) {
      return (currentBase instanceof Date && value.getTime() > currentBase.getTime())
        || 'Date is not later than required'
    }
    return (!isNaN(parseFloat(value)) && parseFloat(value) > parseFloat(currentBase))
      || 'Value is not greater than ' + currentBase
  }
}