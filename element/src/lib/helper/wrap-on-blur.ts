export function wrapOnBlur(
  containerFunction: (event: Event | undefined) => boolean,
  elementFunction?: (
    event: Event | undefined,
    containerFunction?: ((event: Event | undefined) => boolean)
  ) => boolean
) : (event: Event | undefined) => boolean {
  return (event: Event | undefined) : boolean => {
    if (typeof elementFunction !== 'function'
      || elementFunction(event, containerFunction) === true) {
      return containerFunction(event)
    }
    return true
  }
}