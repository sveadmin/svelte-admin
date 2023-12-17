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

export const prepareChangeLimit = (dispatch: EventDispatcher, contextKey: TableContextKey) : ((limitBase: number) => number) => {
  const context = getContext(contextKey) as TableContext

  let pageDetails: PageDetailData
  context.pageDetails.subscribe((value) => pageDetails = value)

  return (limitBase: number) : number => {
    if (isNaN(limitBase)) {
      return pageDetails.limit
    }
    if (limitBase < 1) {
      limitBase = 1;
    }
    if (limitBase > pageDetails.maxLimit) {
      limitBase = pageDetails.maxLimit
    }
    if (pageDetails.limit !== limitBase) {
      context.pageDetails.setLimit(limitBase)
      context.pageDetails.setOffset(0)
      dispatch('pageChanged')
    }
    return limitBase
  }
}