import type {
  ChildrenDefinition,
} from '$lib/types.js'

export function childParser(
  object: ChildrenDefinition | undefined,
  index?: number,
  overwrite?: {[key: string]: any}
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

  if (!overwrite) {
    return currentProperties
  }

  Object.keys(overwrite).map(currentKey => {
    if (!currentProperties.hasOwnProperty(currentKey)) {
      currentProperties[currentKey] = overwrite[currentKey]
    }
  })
  
  return currentProperties
}