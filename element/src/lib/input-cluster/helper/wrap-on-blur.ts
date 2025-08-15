export function wrapOnBlur(
  containerFunction: (event: Event | undefined) => void,
  elementFunction?: (event: Event | undefined) => void
) : (event: Event | undefined) => void {
  return (event: Event | undefined) : void => {
    containerFunction(event)
    if (typeof elementFunction === 'function') {
      elementFunction(event)
    }
  }
}