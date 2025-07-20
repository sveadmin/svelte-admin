export function wrapOnChange(containerFunction: (error: Error) => void, elementFunction?: (error: Error) => void) : (error: Error) => void {
  return (error: Error) : void => {
    containerFunction(error)
    if (typeof elementFunction === 'function') {
      elementFunction(error)
    }
  }
}