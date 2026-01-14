import {
  noopTrue,
} from '@sveadmin/common'

export function wrapOnInput(
  containerFunction?: (event?: Event & { currentTarget: EventTarget & HTMLInputElement; }) => boolean,
  elementFunction?: (
    event?: Event & { currentTarget: EventTarget & HTMLInputElement; },
    containerFunction?: ((event?: Event & { currentTarget: EventTarget & HTMLInputElement; }) => boolean)
  ) => boolean
) : (event?: Event & { currentTarget: EventTarget & HTMLInputElement; }) => boolean {
  if (!containerFunction) {
    return elementFunction ?? noopTrue
  }
  
  return (event?: Event & { currentTarget: EventTarget & HTMLInputElement; }) : boolean => {
    if (typeof elementFunction !== 'function'
      || elementFunction(event, containerFunction) === true) {
      return containerFunction(event)
    }
    return true
  }
}