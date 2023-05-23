import {
  getContext,
} from 'svelte'

import {
  TableContext,
  TableContextKey,
} from '../types.js'

export const prepareClearAllSelection = function (contextKey: TableContextKey): (() => void) {
  const {
    rowMeta,
  } = getContext(contextKey) as TableContext

  return () : void => {
    rowMeta.update(currentValue => Object.keys(currentValue).reduce(
      (aggregator, rowId) => {
        aggregator[rowId] = {
          ...currentValue[rowId],
          selected: false
        }
        return aggregator
      }
    , {}))
  }
}