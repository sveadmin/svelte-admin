import { getContext } from 'svelte'

import {
  TableContext,
  TableContextKey,
} from '../types.js'

export function prepareGetCurrentDropdownMulti (contextKey: TableContextKey, field: string) :(() => {[key: string] : boolean}) {
  const {
    filters
  } = getContext(contextKey) as TableContext
  return () => {
    const filterValues = filters.get(field) || []
    if (!isProduction //TODO: how to replace that the real isProduction value?
      && !filterValues.length
      && filterValues.length === 0) {
      console.warn(`Lookup values for field ${field} are incorrectly setup`)
    }
    return filterValues.reduce(
      (aggregator: {[key: string] : boolean}, filterItem: string) => {
        aggregator[filterItem] = true
        return aggregator
      },
      {}
    )
  }
}