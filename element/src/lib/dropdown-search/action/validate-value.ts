import type {
  AnyValidator,
  ValidatorStore,
} from '@sveadmin/common'

export const prepareValidateValue = (
  validators: ValidatorStore,
  validationData?: {[key: string] : any} | (() => {[key: string] : any})
) => {
  const { validate } = validators
  return function (value: any) {
    const toValidate: AnyValidator = {value}
    if (validationData) {
      toValidate.data = (typeof validationData === 'function') ? validationData() : validationData
    }
    const validationResult = validate(toValidate)
    return validationResult.valid
  }
}