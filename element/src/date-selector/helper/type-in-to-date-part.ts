import {
  DATE_PART__DAY,
  DATE_PART__HOUR,
  DATE_PART__MINUTE,
  DATE_PART__MONTH,
  DATE_PART__YEAR,
  DatePart,
  TYPE_IN__DAY,
  TYPE_IN__HOUR_12,
  TYPE_IN__HOUR_24,
  TYPE_IN__MINUTE,
  TYPE_IN__MONTH_FULL,
  TYPE_IN__MONTH_SHORT,
  TYPE_IN__YEAR_FULL,
  TYPE_IN__YEAR_SHORT,
  TypeIn,
} from '../types.js'

export function typeInToDatePart(type: TypeIn) : DatePart {
  switch (type) {
    case TYPE_IN__DAY:
      return DATE_PART__DAY
    case TYPE_IN__HOUR_12:
    case TYPE_IN__HOUR_24:
      return DATE_PART__HOUR
    case TYPE_IN__MINUTE:
      return DATE_PART__MINUTE
    case TYPE_IN__MONTH_FULL:
    case TYPE_IN__MONTH_SHORT:
      return DATE_PART__MONTH
    case TYPE_IN__YEAR_FULL:
    case TYPE_IN__YEAR_SHORT:
      return DATE_PART__YEAR
  }
}