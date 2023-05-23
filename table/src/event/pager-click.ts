import {
  getContext
} from 'svelte'

import {
  EventDispatcher,
} from '@sveadmin/common'

import {
  MAX_ROWS_PER_PAGE,
  PageDetailData,
  TableContext,
  TableContextKey,
} from '../types.js'

export const preparePagerClick = function (dispatch: EventDispatcher, contextKey: TableContextKey) : ((event: Event) => void) {
  const {
    pageDetails,
  } = getContext(contextKey) as TableContext


  return (event: Event) : void => {
    if (event instanceof KeyboardEvent
      && event.key !== 'Enter') {
      return
    }
    event.preventDefault();
    const target = event.target as HTMLElement
    pageDetails.setOffset(parseInt(target.dataset.offset))
    dispatch('pageChanged')
  }
}