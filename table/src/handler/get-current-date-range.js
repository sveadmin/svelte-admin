import { getContext } from 'svelte'

export function prepareGetCurrentDateRange (contextKey, field) {
  const context = getContext(contextKey)

  let filters

  context.filters.subscribe(currentValue => filters = currentValue)
  return () => filters[field]
}