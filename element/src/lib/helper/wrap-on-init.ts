export function wrapOnInit(
  containerFunction: (el: HTMLElement) => void,
  elementFunction?: (
    el: HTMLElement,
    containerFunction?: ((el: HTMLElement) => void)
  ) => void
) : (el: HTMLElement) => void {
  return (el: HTMLElement) : void => {
    if (typeof elementFunction === 'function') {
      elementFunction(el, containerFunction)
    }
    containerFunction(el)
    return
  }
}