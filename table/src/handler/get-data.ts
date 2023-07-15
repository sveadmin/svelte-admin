import { getContext } from 'svelte'

import {
  DataData,
  TableContext,
  TableContextKey,
} from '../types.js'

export const prepareGetData = function (contextKey: TableContextKey) : (() => {}) {
  const context = getContext(contextKey) as TableContext
  let data: DataData
  
  context.data.subscribe(value => data = value)

  return () => {
    return JSON.parse(JSON.stringify(data))
  }
}