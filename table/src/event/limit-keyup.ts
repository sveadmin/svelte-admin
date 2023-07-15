import{
  getContext,
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

export const prepareLimitKeyup = function (dispatch: EventDispatcher, contextKey: TableContextKey) : ((event: Event) => void) {
  const {
    pageDetails,
  } = getContext(contextKey) as TableContext

  let pageDetailsValue: PageDetailData

  pageDetails.subscribe((value) => pageDetailsValue = value)

  return (event: Event) : void => {
    if (event instanceof KeyboardEvent
      && event.key !== 'Enter') {
      return
    }
    const target = event.target as HTMLInputElement

    let limitBase = parseInt(target.value);
    target.blur();
    if (limitBase < 1) {
      limitBase = 1;
    }
    if (limitBase > MAX_ROWS_PER_PAGE) {
      limitBase = MAX_ROWS_PER_PAGE
    }
    target.value = limitBase + "";
    if (pageDetailsValue.limit === limitBase) {
      return;
    }
    pageDetails.setLimit(limitBase)
    pageDetails.setOffset(0)
    dispatch('pageChanged')
  }
}