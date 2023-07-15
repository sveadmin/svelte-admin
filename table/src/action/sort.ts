import {
  getContext
} from 'svelte'

import {
  SORT_DIRECTION_ASCENDING,
  SORT_DIRECTION_DESCENDING,
  SortActionParameters,
  TableContext,
} from '../types.js'


export const getSortAction = function (parameters: SortActionParameters) {
  const {
    contextKey,
    column,
    callback = null
  } = parameters

  const {
    sort
  } = getContext(contextKey) as TableContext

  return {
    label: 'sort',
    callback: async (event: MouseEvent) => {
      const doubleJump = event.ctrlKey
      const currentDirection = (sort.get(column)) ? sort.get(column) : null
      switch (currentDirection) {
        case SORT_DIRECTION_ASCENDING:
          sort.setColumn(column, (doubleJump) ? null : SORT_DIRECTION_DESCENDING)
          break;
        case SORT_DIRECTION_DESCENDING:
          sort.setColumn(column, (doubleJump) ? SORT_DIRECTION_ASCENDING : null)
          break;
        default:
          sort.setColumn(column, (doubleJump) ? SORT_DIRECTION_DESCENDING : SORT_DIRECTION_ASCENDING)
      }
      if (typeof callback === 'function') {
        await callback()
      }
    }
  }
}