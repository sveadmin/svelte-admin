export function wrapOnKeyUp(
  containerFunction: (event: KeyboardEvent) => void,
  elementFunction?: (event: KeyboardEvent) => void
) : (event: KeyboardEvent) => void {
  return (event: KeyboardEvent) : void => {
    containerFunction(event)
    if (typeof elementFunction === 'function') {
      elementFunction(event)
    }
  }
}