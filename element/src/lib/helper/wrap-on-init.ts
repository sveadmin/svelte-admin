import {
  noop,
} from '@sveadmin/common'

export function wrapOnInit(
  containerFunction?: (el?: HTMLElement) => void,
  elementFunction?: (
    el?: HTMLElement,
    containerFunction?: ((el?: HTMLElement) => void)
  ) => void
) : (el?: HTMLElement) => void {
  if (!containerFunction) {
    return elementFunction ?? noop
  }
  return (el?: HTMLElement) : void => {

    if (typeof elementFunction === 'function') {
      elementFunction(el, containerFunction)
    }
    containerFunction(el)
    return
  }
}