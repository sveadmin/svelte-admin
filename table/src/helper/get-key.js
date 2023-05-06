export const getKey = function (rowAttributes) {
  if (!rowAttributes) {
    console.error('invalid data sent, not Object', rowAttributes)
  }
  if (rowAttributes.attributes) {
    console.warn('entire row sent in not just attributes', rowAttributes)
  }
  return rowAttributes.id;
}
