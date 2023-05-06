import { getContext } from 'svelte'

export const prepareClearAllSelection = function (contextKey) {
  const context = getContext(contextKey)
  const rowMeta = context.rowMeta

  return () => {
    rowMeta.update(currentValue => Object.keys(currentValue).reduce(
      (aggregator, rowId) => {
      console.log(currentValue, aggregator)
        aggregator[rowId] = {
          ...currentValue[rowId],
          selected: false
        }
        return aggregator
      }
    , {}))
  }
}