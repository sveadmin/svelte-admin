import { getContext } from 'svelte';

export const prepareUpdateMeta = function (contextKey) {
  const context = getContext(contextKey)

  const getKey = context.getKey,
    rowMeta = context.rowMeta

  return (rowAttributes, key, value) => {
    rowMeta.updateProperty(getKey(rowAttributes), key, value)
    if (key === 'status') {
      setTimeout(() => rowMeta.updateProperty(getKey(rowAttributes), 'status', null), 4000);
    }
  }
}