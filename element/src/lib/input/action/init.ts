export function prepareInit(
  autoFocus: boolean,
  focus?: (event?: Event) => void,
  onInit?: (el: HTMLElement) => void
) {
  return (el: HTMLElement) => {
    if (autoFocus) {
      el.focus()
      if (typeof focus === 'function') {
        focus()
      }
      if (typeof onInit === 'function') {
        onInit(el)
      }
    }
  }
}