import type {
  ChildrenDefinition,
} from '$lib/types.js'

export function firstChildParser(
  object: ChildrenDefinition | undefined,
  map: {[key: string]: any}
) : {[key: string] : any} {
  if (!object) {
    object= {}
  }
  if (!object.hasOwnProperty(0)) {
    object[0] = {}
  }

  const currentProperties = object[0] ?? {}

  Object.keys(map).map(currentKey => {
    if (!currentProperties.hasOwnProperty(currentKey)) {
      currentProperties[currentKey] = map[currentKey]
    }
  })
  
  return currentProperties
}