import{
  getContext,
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
  prepareChangeLimit,
} from '../action/index.js'

export const prepareLimitKeyup = function (dispatch: EventDispatcher, contextKey: TableContextKey) : ((event: Event) => void) {
  const {
    pageDetails,
  } = getContext(contextKey) as TableContext

  let pageDetailsValue: PageDetailData

  pageDetails.subscribe((value) => pageDetailsValue = value)
  const changeLimit = prepareChangeLimit(dispatch, contextKey)

  return (event: Event) : void => {
    const target = event.target as HTMLInputElement
    if (event instanceof KeyboardEvent
      && event.key !== 'Enter') {
      if (event.key === 'Escape') {
        target.blur()
        target.value = pageDetailsValue.limit + ""
      }
      return
    }

    target.value = changeLimit(parseInt(target.value)) + ""
    target.blur()
  }
}