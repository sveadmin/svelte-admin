import {
  BoundaryStore,
  RANGE_INPUT_EVENT_SET_LOWER,
} from '../types.js'

export const prepareSetLower = (boundaries: BoundaryStore, dispatch) => {
  return (e: Event) => {
  console.log('setLower', e.target.tagName, e.target.dataset)
    const target = e.target as HTMLElement
    const { index } = target.dataset
    boundaries.setLower(parseInt(index))
    dispatch(RANGE_INPUT_EVENT_SET_LOWER, parseInt(index))
  }
}