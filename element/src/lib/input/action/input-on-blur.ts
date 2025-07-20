import type {
  ValidatorStore,
} from '@sveadmin/common'

export function prepareInputOnBlur(
  validators: ValidatorStore,
  onBlur?: (event: Event) => void
) : (event: Event) => void
{
  return (event: Event) : void => {
  console.log('validate event', event)
    const target = event.target as HTMLInputElement
  console.log('validate target', target.value, target) //At this point, the tune is updated, but its value is not synced to the input field
    validators.validate({value : target.value})
    if (typeof onBlur === 'function') {
      onBlur(event)
    }
  }
}