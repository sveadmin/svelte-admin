import type {
  ChildrenDefinition,
} from '$lib/types.js'

export function childrenPropertyParser(
  object: ChildrenDefinition,
) : ChildrenDefinition | undefined {
  const keys : number[] = Object.keys(object) as unknown as number[]
  let parsedObject : ChildrenDefinition | undefined

  keys.map((key : number) => {
    if (key > 0) {
      if (!parsedObject) {
        parsedObject = {}
      }
      parsedObject[key - 1] = object[key]
    }
  })
  
  return parsedObject
}