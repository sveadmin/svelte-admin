import {
  Writable,
} from 'svelte/store'

import type {
  Option,
} from '../types.js'

export const prepareGenerateLookTable = (
  values: Writable<Option[]>,
  lookupTable: {[key: string]: string} = {}
): () => {[key: string]: string} => {
  let valuesData: Option[] = []

  values.subscribe(currentValue => {
    valuesData = (!currentValue.length)
      ? Object.values(currentValue)
      : currentValue
  })

  return () => valuesData.reduce(
    (aggregator, row) => {
      if (!lookupTable[row.id]) {
        lookupTable[row.id] = row.value.toString()
      }
      return aggregator
    },
    lookupTable
  )
}