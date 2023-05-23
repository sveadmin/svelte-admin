import { getContext } from 'svelte'

import {
  DataData,
  TableContext,
  TableContextKey,
} from '../types.js'

export const prepareReload = function (contextKey: TableContextKey) : ((newData: DataData) => void) {
  const {
    data,
  } = getContext(contextKey) as TableContext

  return (newData: DataData) : void => {
    data.set(newData)
  }
}