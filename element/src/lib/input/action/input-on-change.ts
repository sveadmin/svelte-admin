import type {
  ValidatorStore,
} from '@sveadmin/common'

export function prepareInputOnChange(
  validators: ValidatorStore,
  onChange?: (event: Event) => void
) : (event: Event) => void
{
  return (event: Event) : void => {
    const target = event.target as HTMLInputElement
    validators.validate({value : target.value})
    if (typeof onChange === 'function') {
      onChange(event)
    }
  }
}