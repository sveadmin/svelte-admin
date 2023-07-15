import {
  RowAttributes,
  RowKey,
} from '../types.js'

export const getKey = function (rowAttributes: RowAttributes) : RowKey {
  if (!rowAttributes) {
    console.error('invalid data sent, not Object', rowAttributes)
  }
  if (rowAttributes.attributes) {
    console.warn('entire row sent in not just attributes', rowAttributes)
  }
  return rowAttributes.id;
}
