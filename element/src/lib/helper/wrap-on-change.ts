export function wrapOnChange(
  containerFunction: (value: any) => boolean,
  elementFunction?: (
    value: any,
    containerFunction?: ((value: any) => boolean)
  ) => boolean
) : (value: any) => boolean {
  return (value: any) : boolean => {
    if (typeof elementFunction !== 'function'
      || elementFunction(value, containerFunction) === true) {
      return containerFunction(value)
    }
    return true
  }
}