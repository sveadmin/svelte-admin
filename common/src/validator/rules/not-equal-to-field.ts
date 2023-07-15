export function notEqualToFieldValidator (fieldName: string, ignoreEmpty: boolean = false) {
  return function (value: any, data = {}) {
    return (value != data[fieldName]
      || (ignoreEmpty
        && !data[fieldName]))
      || 'Value can not be equal to field `' + fieldName + '` : ' + data[fieldName]
  }
}