import type {
  Option,
} from '../types.js'

export const generateLookTable = (
  values: Option[],
  lookupTable: {[key: string]: string} = {}
): {[key: string]: string} => {
  if (!values.length) { //Somehow an integer indexed Object can be received here
    values = Object.values(values)
  }

  return values.reduce(
    (aggregator, row) => {
      if (!lookupTable[row.id]) {
        lookupTable[row.id] = row.value
      }
      return aggregator
    },
    lookupTable
  )
}