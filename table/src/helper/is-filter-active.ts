import {
  getContext
} from 'svelte'

import {
  TableContext,
  TableContextKey,
} from '../types.js'

export const prepareIsFilterActive = (
  contextKey: TableContextKey,
  field: string,
  defaultValue: any = null
) => {
  const {
    filters,
    meta,
  } = getContext(contextKey) as TableContext

  let currentValue: any

  const updateIsActiveFlag = () => {
    meta.updateAttribute(
      `${field}FilterIsActive`,
      currentValue && JSON.stringify(currentValue) !== JSON.stringify(defaultValue)
    )
  }

  filters.subscribe(allFilters => {
    currentValue = allFilters[field]
    updateIsActiveFlag()
  })

  return updateIsActiveFlag
}