export function wrapOnFocus(
  containerFunction: (event?: Event) => boolean,
  elementFunction?: (
    event?: Event,
    containerFunction?: ((event: Event) => boolean)
  ) => boolean
) : (event?: Event) => boolean {
  return (event?: Event) : boolean => {
    if (typeof elementFunction !== 'function'
      || elementFunction(event, containerFunction) === true) {
      return containerFunction(event)
    }
    return true
  }
}