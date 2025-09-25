export function wrapOnMouseAction(
  containerFunction: (event?: MouseEvent) => boolean,
  elementFunction?: (
    event?: MouseEvent,
    containerFunction?: ((event?: MouseEvent) => boolean)
  ) => boolean
) : (event?: MouseEvent) => boolean {
  return (event?: MouseEvent) : boolean => {
    if (typeof elementFunction !== 'function'
      || elementFunction(event, containerFunction) === true) {
      return containerFunction(event)
    }
    return true
  }
}