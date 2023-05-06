import { getContext } from 'svelte'

export function prepareGetCurrentDropdownMulti (contextKey, field) {
  const { filters } = getContext(contextKey)
  return () => {
    const filterValues = filters.get(field) || []
    if (!isProduction
      && !filterValues.length
      && filterValues.length === 0) {
      console.warn(`Lookup values for field ${field} are incorrectly setup`)
    }
    return filterValues.reduce(
      (aggregator, filterItem) => {
        aggregator[filterItem] = true
        return aggregator
      },
      {}
    )
  }
}