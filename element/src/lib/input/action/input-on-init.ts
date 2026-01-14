export function prepareInputOnInit(
  autoFocus: boolean,
) {
  return (el?: HTMLElement) : boolean => {
    if (el
      && autoFocus) {
      el.focus()
    }
    return true
  }
}