import type {
  ValidatorStore,
} from '@sveadmin/common'

export function prepareInputOnInput(
  validators: ValidatorStore,
  isValidationPerformedWhileTyping: boolean,
) : (event?: Event & { currentTarget: EventTarget & HTMLInputElement; }) => boolean
{
  return (event?: Event & { currentTarget: EventTarget & HTMLInputElement; }) : boolean => {
    if (!event) {
      return true
    }
    const target = event.target as HTMLInputElement
    const value = target.value
    if (!isValidationPerformedWhileTyping) {
      return true
    }
    validators.validate({value})
    return true
  }
}