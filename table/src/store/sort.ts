import {
  noop,
} from 'svelte/internal'

import {
  get as internalGet,
  writable,
  Writable,
} from 'svelte/store'

import {
  router,
  RouterData,
} from '@sveadmin/common'

import {
  ALLOWED_SORT_DIRECTIONS,
  SortData,
  SortDirection,
  SortStore,
  SortStoreConstructor,
} from '../types.js'


export const getSort = (parameters: SortStoreConstructor = {} ) : SortStore => {
  const {
    importedSort = {}
  } = parameters

  let sort: {[key: string]: SortDirection} = {}

  router.subscribe((currentValue : RouterData) =>
    sort = currentValue.routingParameters
      && currentValue.routingParameters.named
      && currentValue.routingParameters.named.sort
      || {}
    )

  const store : Writable<SortData> = writable({...importedSort, ...sort})
  const {subscribe, set, update} = store

  const get = (column: string) : SortDirection => {
    const data = internalGet(store)
    return data[column]
  }

  const setColumn = (column : string, direction : SortDirection) : void => {
    update(currentValue => {
      currentValue[column] = direction
      return currentValue
    })
  }

  return {
    get,
    set,
    setColumn,
    subscribe,
    update: noop
  }
}