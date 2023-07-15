import { getContext } from 'svelte'

import {
  FilterData,
  TableContext,
  TableContextKey,
} from '../types.js'

export function prepareGetCurrentDateRange (contextKey: TableContextKey, field: string) : (() => any) {
  const context = getContext(contextKey) as TableContext

  let filters : FilterData

  context.filters.subscribe(currentValue => filters = currentValue)
  return () => filters[field]
}