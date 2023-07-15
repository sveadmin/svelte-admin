import { getContext } from 'svelte';
import {
    comparator,
} from '../helper/index.js'

import {
  RowAttributes,
  TableContext,
  TableContextKey,
} from '../types.js'

export const prepareResetOriginalData = function (contextKey: TableContextKey) : ((rowAttributes: RowAttributes) => void) {
  const {
    getKey,
    originalData,
  } = getContext(contextKey) as TableContext

  return (rowAttributes: RowAttributes) : void => {
    if (typeof rowAttributes === 'undefined') {
      originalData.set({})
    } else {
      originalData.update(
        (currentValue) => {
          currentValue[getKey(rowAttributes)] = Object.entries(rowAttributes).reduce(
            (aggregator, [index, value]) => {
              aggregator[index] = comparator(value)
              return aggregator
            },
            {}
          )
          return currentValue
        }
      )
    }
  }
}