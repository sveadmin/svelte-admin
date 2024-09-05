import { DateFunction } from '../types.js'

export function laterThanValidator (base: Date | DateFunction ) {
  return function (value: Date) : boolean | string {
    const currentBase = (typeof base === 'function') ? base() : base
    if (typeof currentBase === 'undefined'
        || currentBase === null) {
      return true
    }
    return (currentBase instanceof Date && value.getTime() > currentBase.getTime())
      || 'Date is not later than required'
  }
}