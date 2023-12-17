import {
  writable,
  Writable,
} from 'svelte/store'

import {
  noop,
} from 'svelte/internal'

import {
  router,
  RouterData,
} from '@sveadmin/common'

import {
  MAX_ROWS_PER_PAGE,
  PageDetailData,
  PageDetailStore,
  PageDetailStoreConstructor,
} from '../types.js'

export const getPageDetails = (parameters: PageDetailStoreConstructor = {}) : PageDetailStore => {
  let namedRoutingParameters: {[key: string] : any} = {}

  router.subscribe((currentValue : RouterData) => namedRoutingParameters = currentValue.routingParameters && currentValue.routingParameters.namedParameters || {})

  const {
    size = namedRoutingParameters && namedRoutingParameters.size || 0,
    limit = namedRoutingParameters && namedRoutingParameters.limit || 10,
    maxLimit = MAX_ROWS_PER_PAGE,
    offset = namedRoutingParameters && namedRoutingParameters.offset || 0
  } = parameters


  const store : Writable<PageDetailData> = writable({
    size,
    limit,
    maxLimit,
    offset,
  })
  const {subscribe, set, update} = store

  const setSize = (size: number) : void => {
    update((currentValue) => {currentValue.size = size; return currentValue})
  }

  const setLimit = (limit: number) : void => {
    update((currentValue) => {currentValue.limit = limit; return currentValue})
  }

  const setMaxLimit = (maxLimit: number) : void => {
    update((currentValue) => {currentValue.maxLimit = maxLimit; return currentValue})
  }

  const setOffset = (offset: number) : void => {
    update((currentValue) => {currentValue.offset = offset; return currentValue})
  }

  return {
    set,
    setLimit,
    setMaxLimit,
    setOffset,
    setSize,
    subscribe,
    update : noop
  }

}