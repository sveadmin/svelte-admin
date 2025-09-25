export function wrapOnKeyPress(
  containerFunction: (event?: KeyboardEvent) => boolean | Promise<boolean>,
  elementFunction?: (
    event?: KeyboardEvent,
    containerFunction?: ((event?: KeyboardEvent) => boolean | Promise<boolean>)
  ) => boolean | Promise<boolean>
) : (event?: KeyboardEvent) => Promise<boolean> {
  return async (event?: KeyboardEvent) : Promise<boolean> => {
    if (typeof elementFunction !== 'function'
      || await elementFunction(event, containerFunction) === true) {
      return containerFunction(event)
    }
    return true
  }
}