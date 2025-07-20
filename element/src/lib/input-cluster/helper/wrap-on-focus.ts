export function wrapOnFocus(containerFunction: (event: Event) => void, elementFunction?: (event: Event) => void) : (event: Event) => void {
  return (event: Event) : void => {
    containerFunction(event)
    if (typeof elementFunction === 'function') {
      elementFunction(event)
    }
  }
}