import type {
  ValidatorStore,
} from '@sveadmin/common'

export function prepareInputOnChange(
  validators: ValidatorStore,
) : (value: any) => boolean
{
  return (value: any) : boolean => {
    const isValid = validators.validate({value})
    return isValid.valid
  }
}