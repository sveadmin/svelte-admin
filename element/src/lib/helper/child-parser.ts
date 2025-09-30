import type {
  ChildrenDefinition,
} from '$lib/types.js'

export function childParser(
  object: ChildrenDefinition | undefined,
  index?: number,
  map?: {[key: string]: any}
) : {[key: string] : any} {
  if (!index) {
    index = 0
  }
  if (!object) {
    object= {}
  }
  if (!object.hasOwnProperty(index)) {
    object[index] = {}
  }

  const currentProperties = object[index] ?? {}

  if (!map) {
    return currentProperties
  }

  Object.keys(map).map(currentKey => {
    if (!currentProperties.hasOwnProperty(currentKey)) {
      currentProperties[currentKey] = map[currentKey]
    }
  })
  
  return currentProperties
}