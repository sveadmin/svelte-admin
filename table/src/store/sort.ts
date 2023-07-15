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
  SORT_DIRECTION_ASCENDING,
  SORT_DIRECTION_DESCENDING,
  SortStore,
  SortStoreConstructor,
} from '../types.js'


export const getSort = (parameters: SortStoreConstructor = {} ) : SortStore => {
  const {
    initialValue = {}
  } = parameters

  let sort: {[key: string]: SortDirection} = {}

  router.subscribe((currentValue : RouterData) =>  {
    const importedSort = currentValue.routingParameters
      && currentValue.routingParameters.namedParameters
      && currentValue.routingParameters.namedParameters.sort
      || ''

    importedSort.split(',').map((sortPiece: string) => {
      if (sortPiece.substring(0, 1) === '-') {
        sort[sortPiece.substring(1)] = SORT_DIRECTION_DESCENDING
        return
      }

      sort[sortPiece] = SORT_DIRECTION_ASCENDING
    })

  })

  const store : Writable<SortData> = writable({...initialValue, ...sort})
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