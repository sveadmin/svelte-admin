export function ariaParser(aria?: {[key: string] : string}) : {[key: string] : string} {
  if (!aria) {
    return {}
  }
  return Object.keys(aria).reduce(
    (aggregator: {[key: string] : string}, currentKey: string) => {
      aggregator['aria-' + currentKey] = aria[currentKey]
      return aggregator
    },
    {}
  )
}
