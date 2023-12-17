import {
  getContext
} from 'svelte'

import {
  EventDispatcher,
} from '@sveadmin/common'

import {
  PageDetailData,
  TableContext,
  TableContextKey,
} from '../types.js'

import {
  prepareChangePage,
} from '../action/index.js'


export const preparePagerKeyup = function (dispatch: EventDispatcher, contextKey: TableContextKey) : ((event: KeyboardEvent) => void) {
  const context = getContext(contextKey) as TableContext

  let pageDetails: PageDetailData

  context.pageDetails.subscribe((value) => pageDetails = value)
  const changePage = prepareChangePage(dispatch, contextKey)

  return (event: KeyboardEvent) : void => {
    const target = event.target as HTMLInputElement
    if (event.key !== 'Enter') {
      if (event.key === 'Escape') {
        target.blur()
        const displayOffset = pageDetails.offset + 1
        target.value = displayOffset + ""
      }
      return
    }

    const offsetBase = changePage(parseInt(target.value) - 1)
    const displayOffset = offsetBase + 1
    target.value = displayOffset + "";
    target.blur();
  }
}