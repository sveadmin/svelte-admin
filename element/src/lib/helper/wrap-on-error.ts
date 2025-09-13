export function wrapOnError(
  containerFunction: (error: Error) => boolean,
  elementFunction?: (
    error: Error,
    containerFunction?: ((error: Error) => boolean)
  ) => boolean
) : (error: Error) => boolean {
  return (error: Error) : boolean => {
    if (typeof elementFunction !== 'function'
      || elementFunction(error, containerFunction) === true) {
      return containerFunction(error)
    }
    return true
  }
}