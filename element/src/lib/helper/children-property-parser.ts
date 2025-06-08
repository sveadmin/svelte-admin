export function childrenPropertyParser(
  object: {0?: {[key: string]: any}},
  map: {[key: string]: any}
) : {0: {[key: string]: any}} {
  if (!object.hasOwnProperty(0)) {
    object[0] = {}
  }
  const currentProperties = object[0] ?? {}
  Object.keys(map).map(currentKey => {
    if (!currentProperties.hasOwnProperty(currentKey)) {
      currentProperties[currentKey] = map[currentKey]
    }
  })
  
  return {0: currentProperties}
}