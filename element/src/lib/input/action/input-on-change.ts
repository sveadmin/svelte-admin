import type {
  ValidatorStore,
} from '@sveadmin/common'

export function prepareInputOnChange(
  validators: ValidatorStore,
) : (event?: Event) => boolean
{
  return (event?: Event) : boolean => {
    if (!event) {
      return false
    }
    const target = event.target as HTMLInputElement
    const isValid = validators.validate(target.value)
    return isValid.valid
  }
}