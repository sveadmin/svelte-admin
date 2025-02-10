export function prepareFocus(
  onFocus?: (event?: Event) => void,
) {
  return (event?: Event) : void => {
    if (typeof onFocus === 'function') {
      onFocus(event)
    }
  }
}