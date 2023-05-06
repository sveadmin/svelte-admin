import { getContext } from 'svelte'

export const prepareGetData = function (contextKey) {
  const context = getContext(contextKey)
  let data
  
  context.data.subscribe(value => data = value)

  return () => {
    return JSON.parse(JSON.stringify(data))
  }
}