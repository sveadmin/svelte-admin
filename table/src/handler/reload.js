import { getContext } from 'svelte'

export const getReload = function (contextKey) {
  const context = getContext(contextKey)
  const data = context.data

  return (newData) => {
    data.set(newData)
  }
}