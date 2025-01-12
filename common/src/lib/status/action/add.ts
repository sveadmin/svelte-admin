import { browser } from '$app/environment'
import { page } from '$app/stores';  

import {
  type StatusData,
  type StatusMessage,
  STATUS_TYPE_NORMAL,
} from '../types.js'

export function prepareAdd(store: StatusData) {
  let currentRoute: string

  if (browser) {
    page.subscribe(currentValue => {
      currentRoute = currentValue?.url?.pathname
    })
  } else {
    currentRoute = 'SERVER'
  }

  return (parameters: StatusMessage | string) => {
    if (typeof parameters === 'string') {
      parameters = {
        message: parameters
      }
    }
    store.messages.unshift({
      message: parameters.message,
      route: parameters.route ?? currentRoute,
      type: parameters.type ?? STATUS_TYPE_NORMAL,
      dismissed: false,
      id: store.messages.length,
      time: new Date(),
    })
  }
}