import {
  Writable,
} from 'svelte/store'


import {
  router,
} from '../../router/index.js'

import {
  StatusMessage,
  STATUS_TYPE_NORMAL,
} from '../types.js'

export function prepareAdd(store: Writable<StatusMessage[]>) {
  const { update } = store
  let currentRoute: string

  router.subscribe(currentValue => {
    currentRoute = currentValue.current
  })

  return (parameters: StatusMessage) => {
    update((statuses: StatusMessage[]) => {
      statuses.unshift({
        message: parameters.message,
        route: parameters.route ?? currentRoute,
        type: parameters.type ?? STATUS_TYPE_NORMAL,
        dismissed: false,
        id: statuses.length,
        time: new Date(),
      })
      return statuses;
    })
  }
}