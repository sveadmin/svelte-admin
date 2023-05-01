import type {
  Option,
} from '../types.js'

export const generateLookTable = (
  values: Array<Option>,
  lookupTable: {[key: string]: string} = {}
): {[key: string]: string} => {
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