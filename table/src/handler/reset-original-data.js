import { getContext } from 'svelte';
import {
    comparator,
} from '../helper'

export const getResetOriginalData = function (contextKey) {
  const context = getContext(contextKey)

  const getKey = context.getKey,
    originalData = context.originalData

  return (rowAttributes) => {
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