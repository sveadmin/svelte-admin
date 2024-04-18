import {
  Writable,
} from 'svelte/store'

import {
  StatusMessage,
  STATUS_TYPE_NORMAL,
} from '../types.js'

export function prepareAdd(store: Writable<StatusMessage[]>) {
  const { update } = store
  return (parameters: StatusMessage) => {
    update((statuses: StatusMessage[]) => {
      statuses.unshift({
        message: parameters.message,
        type: parameters.type ?? STATUS_TYPE_NORMAL,
        dismissed: false,
        id: statuses.length,
        time: new Date(),
      })
      return statuses;
    })
  }
}