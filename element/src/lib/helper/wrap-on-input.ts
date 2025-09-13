export function wrapOnInput(
  containerFunction: (event: InputEvent) => boolean,
  elementFunction?: (
    event: InputEvent,
    containerFunction?: ((event: InputEvent) => boolean)
  ) => boolean
) : (event: InputEvent) => boolean {
  return (event: InputEvent) : boolean => {
    if (typeof elementFunction !== 'function'
      || elementFunction(event, containerFunction) === true) {
      return containerFunction(event)
    }
    return true
  }
}