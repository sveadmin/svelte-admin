export function dataParser(data?: {[key: string] : string}) : {[key: string] : string} {
  if (!data) {
    return {}
  }
  return Object.keys(data).reduce(
    (aggregator: {[key: string] : string}, currentKey: string) => {
      aggregator['data-' + currentKey] = data[currentKey]
      return aggregator
    },
    {}
  )
}
