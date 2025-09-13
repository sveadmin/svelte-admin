import type {
  ValidatorStore,
} from '@sveadmin/common'

export const prepareOnChange = (validators: ValidatorStore) => {
  return (value: any) : boolean => {
    validators.validate()
    return true
  }
}