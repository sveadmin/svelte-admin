import type {
  ValidatorStore,
} from '@sveadmin/common'

export function prepareInputOnInput(
  validators: ValidatorStore,
  validateWhileTyping: boolean,
) : (event: Event & { currentTarget: EventTarget & HTMLInputElement; }) => boolean
{
  return (event: Event & { currentTarget: EventTarget & HTMLInputElement; }) : boolean => {
    const target = event.target as HTMLInputElement
    const value = target.value
    if (!validateWhileTyping) {
      return true
    }
    validators.validate({value})
    return true
  }
}