export function wrapOnInit(containerFunction: (el: HTMLElement) => void, elementFunction?: (el: HTMLElement) => void) : (el: HTMLElement) => void {
  return (el: HTMLElement) : void => {
    containerFunction(el)
    if (typeof elementFunction === 'function') {
      elementFunction(el)
    }
  }
}