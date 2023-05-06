import { getContext } from 'svelte'

export const prepareIsFilterActive = (contextKey, field, defaultValue = null) => {
  const context = getContext(contextKey)

  let currentValue

  const updateIsActiveFlag = () => {
    context.meta.updateAttribute(
      `${field}FilterIsActive`,
      currentValue && JSON.stringify(currentValue) !== JSON.stringify(defaultValue)
    )
  }

  context.filters.subscribe(allFilters => {
    currentValue = allFilters[field]
    updateIsActiveFlag()
  })

  return updateIsActiveFlag
}