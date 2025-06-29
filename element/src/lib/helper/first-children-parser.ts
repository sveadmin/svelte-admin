import type {
  ChildrenDefinition,
  FirstChildrenDefinition,
} from '$lib/types.js'

export function firstChildrenParser(
  object: ChildrenDefinition | undefined,
  map: {[key: string]: any}
) : FirstChildrenDefinition {
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
  
  return {0: currentProperties}
}