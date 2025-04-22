import * as e from '../errors.js'

export const en_GB = {
  [e.DAY_DOES_NOT_MATCH_CRITERIA]               : 'Day is not equal to expected value!',
  [e.EMPTY_DATE]                                : 'Date is required!',
  [e.INVALID_DATE]                              : 'Please enter a valid date!',
  [e.INVALID_EMAIL]                             : 'Please enter a valid email!',
  [e.LIST_IS_EMPTY]                             : 'At least one member is required!',
  [e.MONTH_DOES_NOT_MATCH_CRITERIA]             : 'Month is not equal to expected value!',
  [e.VALUE_BLOCKED]                             : 'Please select a different value, this is not allowed!${list}',
  [e.VALUE_IS_NOT_BIG_ENOUGH]                   : 'Please select a value greater than ${limit}!',
  [e.VALUE_IS_NOT_BIG_ENOUGH_ALLOWING_EQUAL]    : 'Please select a value greater than or equal to ${limit}!',
  [e.VALUE_IS_NOT_SMALL_ENOUGH]                 : 'Please select a value less than ${limit}!',
  [e.VALUE_IS_NOT_SMALL_ENOUGH_ALLOWING_EQUAL]  : 'Please select a value less than or equal to ${limit}!',
  [e.VALUE_MATCHES_BLACKLISTED_COLUMN]          : 'Please select a different value, this matches the value of field `${fieldName}`!',
  [e.VALUE_NOT_ALLOWED]                         : 'Please select a value from the list of allowed ones!${list}',
  [e.VALUE_REQUIRED]                            : 'Please provide a value!',
  [e.YEAR_DOES_NOT_MATCH_CRITERIA]              : 'Year is not equal to expected value!',
}