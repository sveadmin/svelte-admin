import {
  EventDispatcher,
} from '@sveadmin/common'

import {
  TableContextKey,
} from '../types.js'

import {
  prepareChangePage,
} from '../action/index.js'

export const preparePagerSubmit = function (dispatch: EventDispatcher, contextKey: TableContextKey) : ((event: Event) => void) {
  const changePage = prepareChangePage(dispatch, contextKey)

  return (event: Event) : void => {
    const button = event.target as HTMLElement
    const targetId = button.dataset.target
    const target = document.getElementById(targetId) as HTMLInputElement

    const offsetBase = changePage(parseInt(target.value) - 1)
    const displayOffset = offsetBase + 1
    target.value = displayOffset + "";
    target.blur()
  }
}