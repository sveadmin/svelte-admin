import { getContext } from 'svelte'
import { modal, clearModal } from '../../../../store/modal'

export function prepareGetFilterDateRange (contextKey, field, callback = null) {
  const { filters, meta, pageDetails } = getContext(contextKey)
  return async (event) => {
    filters.add(field, event.detail)
    meta.updateAttribute(`${field}FilterIsActive`, event.detail.after || event.detail.before)
    modal.set(clearModal)
    pageDetails.setOffset(0)
    if (typeof callback === 'function') {
      callback()
    }
  }
} 