import type {
  ChildrenDefinition,
} from '$lib/types.js'

export function childParser(
  object: ChildrenDefinition | undefined,
  index?: PropertyKey,
  defaults?: {[key: string]: any}
) : {[key: string] : any} {
  if (!index) {
    index = 0
  }
  if (!object) {
    object = {}
  }
  if (!object.hasOwnProperty(index)) {
    object[index] = {}
  }

  const currentProperties = object[index] ?? {}

  if (!defaults) {
    return currentProperties
  }

  Object.keys(defaults).map(currentKey => {
    if (!currentProperties.hasOwnProperty(currentKey)) {
      currentProperties[currentKey] = defaults[currentKey]
    }
  })
  
  return currentProperties
}