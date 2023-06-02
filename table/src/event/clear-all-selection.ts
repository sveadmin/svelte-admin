import {
  getContext,
} from 'svelte'

import {
  TableContext,
  TableContextKey,
} from '../types.js'

export const prepareClearAllSelection = function (contextKey: TableContextKey): ((event: Event) => void) {
  const {
    rowMeta,
  } = getContext(contextKey) as TableContext

  return (event: Event) : void => {
    if (event instanceof KeyboardEvent
      && event.key !== 'Enter'
      && event.key !== 'Space') {
      return
    }
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