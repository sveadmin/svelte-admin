import { getContext } from 'svelte'

export const getPagerKeyup = function (dispatch, contextKey) {
  const context = getContext(contextKey)

  const pageDetails = context.pageDetails
  
  let pageDetailsValue

  context.pageDetails.subscribe((value) => pageDetailsValue = value)

  return (event) => {
    if (event.keyCode === 13) {
      let offsetBase = parseInt(event.target.value) - 1;
      if (isNaN(offsetBase)) {
        offsetBase = 0;
      }
      event.target.blur();
      if (offsetBase < 0) {
        offsetBase = 0;
      }
      if (offsetBase > Math.floor(pageDetailsValue.size / pageDetailsValue.limit)) {
        offsetBase = Math.floor(pageDetailsValue.size / pageDetailsValue.limit)
        offsetBase -= (pageDetailsValue.size % pageDetailsValue.limit === 0) ? 1 : 0;
      }
      event.target.value = offsetBase + 1;
      if (pageDetailsValue.offset === offsetBase * pageDetailsValue.limit) {
        return;
      }
      pageDetails.setOffset(offsetBase * pageDetailsValue.limit)
      dispatch('pageChanged')
    }
  }
}