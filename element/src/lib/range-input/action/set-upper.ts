import {
  BoundaryStore,
  RANGE_INPUT_EVENT_SET_UPPER,
} from '../types.js'

export const prepareSetUpper = (boundaries: BoundaryStore, dispatch) => {
  return (e: Event) => {
  console.log('setUpper', e.target.tagName, e.target.dataset)
    const target = e.target as HTMLElement
    const { index } = target.dataset
    boundaries.setUpper(parseInt(index))
    dispatch(RANGE_INPUT_EVENT_SET_UPPER, parseInt(index))
  }
}