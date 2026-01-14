import {
  noopTrue,
} from '@sveadmin/common'

export function wrapOnEvent(
  containerFunction?: (event?: Event) => boolean,
  elementFunction?: (
    event?: Event,
    containerFunction?: ((event?: Event) => boolean)
  ) => boolean
) : (event?: Event) => boolean {
  if (!containerFunction) {
    return elementFunction ?? noopTrue
  }
  return (event?: Event) : boolean => {
    if (typeof elementFunction !== 'function'
      || elementFunction(event, containerFunction) === true) {
      return containerFunction(event)
    }
    return true
  }
}