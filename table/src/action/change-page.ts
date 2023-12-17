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

export const prepareChangePage = (dispatch: EventDispatcher, contextKey: TableContextKey) : ((limitBase: number) => number) => {
  const context = getContext(contextKey) as TableContext

  let pageDetails: PageDetailData
  context.pageDetails.subscribe((value) => pageDetails = value)

  return (offsetBase: number) : number => {
    if (isNaN(offsetBase)) {
      return pageDetails.offset
    }
    if (offsetBase < 0) {
      offsetBase = 0;
    }
    if (offsetBase > Math.floor(pageDetails.size / pageDetails.limit)) {
      offsetBase = Math.floor(pageDetails.size / pageDetails.limit)
      offsetBase -= (pageDetails.size % pageDetails.limit === 0) ? 1 : 0;
    }
    if (pageDetails.offset !== offsetBase * pageDetails.limit) {
      context.pageDetails.setOffset(offsetBase * pageDetails.limit)  
      dispatch('pageChanged')
    }
    return offsetBase
  }
}