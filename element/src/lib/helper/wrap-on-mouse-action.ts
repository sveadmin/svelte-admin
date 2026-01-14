import { noopTrue } from "@sveadmin/common"

export function wrapOnMouseAction(
  containerFunction?: (event?: MouseEvent) => boolean,
  elementFunction?: (
    event?: MouseEvent,
    containerFunction?: ((event?: MouseEvent) => boolean)
  ) => boolean
) : (event?: MouseEvent) => boolean {
  if (!containerFunction) {
    return elementFunction ?? noopTrue
  }

  return (event?: MouseEvent) : boolean => {
    if (typeof elementFunction !== 'function'
      || elementFunction(event, containerFunction) === true) {
      return containerFunction(event)
    }
    return true
  }
}