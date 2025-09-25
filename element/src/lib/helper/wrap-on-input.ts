export function wrapOnInput(
  containerFunction: (event?: Event & { currentTarget: EventTarget & HTMLInputElement; }) => boolean,
  elementFunction?: (
    event?: Event & { currentTarget: EventTarget & HTMLInputElement; },
    containerFunction?: ((event?: Event & { currentTarget: EventTarget & HTMLInputElement; }) => boolean)
  ) => boolean
) : (event?: Event & { currentTarget: EventTarget & HTMLInputElement; }) => boolean {
  return (event?: Event & { currentTarget: EventTarget & HTMLInputElement; }) : boolean => {
  console.log(event?.target.id, elementFunction?.toString(), containerFunction.toString())
    if (typeof elementFunction !== 'function'
      || elementFunction(event, containerFunction) === true) {
      return containerFunction(event)
    }
    return true
  }
}