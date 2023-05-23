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

export const preparePagerKeyup = function (dispatch: EventDispatcher, contextKey: TableContextKey) : ((event: KeyboardEvent) => void) {
  const {
    pageDetails,
  } = getContext(contextKey) as TableContext

  let pageDetailsValue: PageDetailData

  pageDetails.subscribe((value) => pageDetailsValue = value)

  return (event: KeyboardEvent) : void => {
    if (event.key !== 'Enter') {
      return
    }

    const target = event.target as HTMLInputElement

    let offsetBase = parseInt(target.value) - 1;
    if (isNaN(offsetBase)) {
      offsetBase = 0;
    }
    target.blur();
    if (offsetBase < 0) {
      offsetBase = 0;
    }
    if (offsetBase > Math.floor(pageDetailsValue.size / pageDetailsValue.limit)) {
      offsetBase = Math.floor(pageDetailsValue.size / pageDetailsValue.limit)
      offsetBase -= (pageDetailsValue.size % pageDetailsValue.limit === 0) ? 1 : 0;
    }
    const displayOffset = offsetBase + 1
    target.value = displayOffset + "";
    if (pageDetailsValue.offset === offsetBase * pageDetailsValue.limit) {
      return;
    }
    pageDetails.setOffset(offsetBase * pageDetailsValue.limit)
    dispatch('pageChanged')
  }
}