import { getContext } from 'svelte'

export const getPagerClick = function (dispatch, contextKey) {
  const context = getContext(contextKey)

  const pageDetails = context.pageDetails

  return (event) => {
    event.preventDefault();
    pageDetails.setOffset(event.target.dataset.offset)
    dispatch('pageChanged')
  }
}