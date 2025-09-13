export function prepareInputOnInit(
  autoFocus: boolean,
) {
  return (el: HTMLElement) : boolean => {
    if (autoFocus) {
      el.focus()
      // TODO: Fire necessary events if ti is not working properly
      // if (typeof focus === 'function') {
      //   focus()
      // }
      // if (typeof onInit === 'function') {
      //   onInit(el)
      // }
    }
    return true
  }
}