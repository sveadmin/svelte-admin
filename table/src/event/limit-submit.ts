import {
  EventDispatcher,
} from '@sveadmin/common'

import {
  TableContextKey,
} from '../types.js'

import {
  prepareChangeLimit,
} from '../action/index.js'

export const prepareLimitSubmit = function (dispatch: EventDispatcher, contextKey: TableContextKey) : ((event: Event) => void) {
  const changeLimit = prepareChangeLimit(dispatch, contextKey)

  return (event: Event) : void => {
    const button = event.target as HTMLElement
    const targetId = button.dataset.target
    const target = document.getElementById(targetId) as HTMLInputElement

    target.value = changeLimit(parseInt(target.value)) + ""
    target.blur()
  }
}