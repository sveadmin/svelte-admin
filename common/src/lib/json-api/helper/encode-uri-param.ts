export function encodeUriParam (
  aggregator: string[],
  [
    currentKey,
    currentValue
  ]
) : string[] {
  if (typeof currentValue === 'function') {
    currentValue = currentValue()
  }

  switch (typeof currentValue) {
    case 'object':
      if (currentValue === null) {
        return aggregator
      }
      if (Array.isArray(currentValue)) {
        if (currentValue.length > 0) {
          currentValue.map((value, index) => {
            aggregator.push(currentKey + '[' + index + ']' + '=' + encodeURI(value))
          })
        }
      } else {
        Object.entries(currentValue).reduce(
          (aggregator, [key, value]) => {
            encodeUriParam(
              aggregator,
              [
                currentKey + '.' + key,
                value
              ])
            return aggregator
          },
          aggregator
        )
      }
      break;
    case 'boolean':
      aggregator.push(currentKey + '=' + ((currentValue) ? '1' : '0'))
      break;
    case 'number':
    default:
      if (currentValue) {
        aggregator.push(currentKey + '=' + encodeURI(currentValue))
      }
  }
  return aggregator
}