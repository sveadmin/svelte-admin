export function wrapOnError(containerFunction: (value: any) => void, elementFunction?: (value: any) => void) : (value: any) => void {
  return (value: any) : void => {
    containerFunction(value)
    if (typeof elementFunction === 'function') {
      elementFunction(CSSUnitValue)
    }
  }
}