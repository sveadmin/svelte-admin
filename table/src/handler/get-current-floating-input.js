import { getContext } from 'svelte'

export function prepareGetCurrentFloatingInput (contextKey, field) {
  const context = getContext(contextKey)

  let filters

  context.filters.subscribe(currentValue => filters = currentValue)
  return () => filters[field]
}