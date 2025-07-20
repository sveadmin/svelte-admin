import type {
  ValidatorStore,
} from '@sveadmin/common'

export const prepareOnChange = (validators: ValidatorStore, callback?: (value: any) => void) => {
  return (value: any) : void => {
    validators.validate()
    if (callback) {
      callback(value)
    }
  }
}