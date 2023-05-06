import{ getContext } from 'svelte'

export const getLimitKeyup = function (dispatch, contextKey) {
  const context = getContext(contextKey)
  const pageDetails = context.pageDetails

  let pageDetailsValue

  context.pageDetails.subscribe((value) => pageDetailsValue = value)

  return (event) => {
    if (event.keyCode === 13) {
      let limitBase = parseInt(event.target.value);
      event.target.blur();
      if (limitBase < 1) {
        limitBase = 1;
      }
      if (limitBase > 1000) {
        limitBase = 1000
      }
      event.target.value = limitBase;
      if (pageDetailsValue.limit === limitBase) {
        return;
      }
      pageDetails.setLimit(limitBase)
      pageDetails.setOffset(0)
      dispatch('pageChanged')
    }
  }
}