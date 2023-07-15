import {
  getContext
} from 'svelte'

import {
  FilterDateRange,
  SCREEN_TYPE_MODAL,
  TableContext,
  TableContextKey,
} from '../types.js'

export function prepareGetFilterDateRange (
  contextKey: TableContextKey,
  field: string,
  callback: (() => void) = null
) : ((event: CustomEvent<FilterDateRange>) => void) {
  const {
    filters,
    meta,
    pageDetails,
    screens,
  } = getContext(contextKey) as TableContext
  
  return async (event) => {
    filters.add(field, event.detail)
    meta.updateAttribute(`${field}FilterIsActive`, event.detail.after || event.detail.before)
    screens.displayTop(SCREEN_TYPE_MODAL, null)
    pageDetails.setOffset(0)
    if (typeof callback === 'function') {
      callback()
    }
  }
} 