import {
  getContext
} from 'svelte'

import {
  prepareIsFilterActive
 } from '../helper/index.js'

import {
  SCREEN_TYPE_MODAL,
  TableContext,
  TableContextKey,
} from '../types.js'

export function prepareGetFilterDropdownMulti (
  contextKey: TableContextKey,
  field: string,
  callback: (() => void) = null
) : ((event: CustomEvent<{[key: string] : boolean}>) => void) {
  const {
    filters,
    pageDetails,
    screens,
  } = getContext(contextKey) as TableContext

  prepareIsFilterActive(contextKey, field, [])
  return async (event) => {
    filters.add(
      field,
      Object.entries(event.detail).reduce(
        (aggregator, value) => {
          if (value[1]) {
            aggregator.push(value[0])
          }
          return aggregator
        },
        []
      )
    )
    screens.displayTop(SCREEN_TYPE_MODAL, null)
    pageDetails.setOffset(0)
    if (typeof callback === 'function') {
      callback()
    }
  }
} 