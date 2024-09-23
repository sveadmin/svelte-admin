import * as e from '../errors.js'

export const en_GB = {
  [e.EMPTY_DATE]                      : 'Date is required!',
  [e.INVALID_DATE]                    : 'Please enter a valid date!',
  [e.INVALID_EMAIL]                   : 'Please enter a valid email!',
  [e.VALUE_BLOCKED]                   : 'Please select a different value, this is not allowed!${list}',
  [e.VALUE_IS_NOT_BIG_ENOUGH]         : 'Please select a value greater than ${limit}!',
  [e.VALUE_NOT_ALLOWED]               : 'Please select a value from the list of allowed ones!${list}',
  [e.VALUE_REQUIRED]                  : 'Please provide a value!',
}