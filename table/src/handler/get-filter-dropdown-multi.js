import { getContext } from 'svelte'
import { modal, clearModal } from '../../../../store/modal'
import { prepareIsFilterActive } from '../helper'

export function prepareGetFilterDropdownMulti (contextKey, field, callback = null) {
  const { filters, pageDetails } = getContext(contextKey)
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
    modal.set(clearModal)
    pageDetails.setOffset(0)
    if (typeof callback === 'function') {
      callback()
    }
  }
} 