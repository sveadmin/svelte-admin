import { getContext } from 'svelte'

export const DIRECTION_ASCENDING = 'asc'

export const DIRECTION_DESCENDING = 'desc'

export const getSortAction = function ({
  contextKey,
  column,
  action = null
}) {
  const context = getContext(contextKey)

  const { sort } = context

  return {
    label: 'sort',
    callback: async event => {
      const doubleJump = event.ctrlKey
      const currentDirection = (sort.get(column)) ? sort.get(column).direction : null
      switch (currentDirection) {
        case DIRECTION_ASCENDING:
          sort.setColumn(column, (doubleJump) ? null : DIRECTION_DESCENDING)
          break;
        case DIRECTION_DESCENDING:
          sort.setColumn(column, (doubleJump) ? DIRECTION_ASCENDING : null)
          break;
        default:
          sort.setColumn(column, (doubleJump) ? DIRECTION_DESCENDING : DIRECTION_ASCENDING)
      }
      if (action) {
        await action()
      }
    }
  }
}