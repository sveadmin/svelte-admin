import {
  getContext
} from 'svelte'

import {
  ActionStatus,
  SORT_DIRECTION_ASCENDING,
  SORT_DIRECTION_DESCENDING,
  SortFixActionParameters,
  TableContext,
  TableContextKey,
} from '../types.js'


export const getSortFixAction = function (parameters: SortFixActionParameters) {
  const {
    contextKey,
    column,
    callback = null,
    direction
  } = parameters

  const {
    sort
  } = getContext(contextKey) as TableContext

  return {
    icon: direction && ((direction === SORT_DIRECTION_ASCENDING) ? 'sort-up' : 'sort-down') || 'sort',
    label: `sort${direction && ((direction === SORT_DIRECTION_ASCENDING) ? 'Up' : 'Down') || 'Unset'}`,
    callback: async (event: MouseEvent) => {
      if (sort.get(column) === direction) {
        return
      }
      switch (direction) {
        case SORT_DIRECTION_ASCENDING:
          sort.setColumn(column, SORT_DIRECTION_ASCENDING)
          break;
        case SORT_DIRECTION_DESCENDING:
          sort.setColumn(column, SORT_DIRECTION_DESCENDING)
          break;
        default:
          sort.setColumn(column, null)
      }
      if (typeof callback === 'function') {
        await callback()
      }
    },
    statusCallback:(status: ActionStatus) : ActionStatus => {
      if (status.final) {
        return status
      }
      if (sort.get(column)) {
        status = {
          status: (sort.get(column) === SORT_DIRECTION_ASCENDING)
            ? '🔺'
            : '🔻',
          final: true
        }
      }
      return status
    }
  }
}