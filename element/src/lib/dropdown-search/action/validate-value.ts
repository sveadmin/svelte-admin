import type {
  ValidatorStore,
} from '@sveadmin/common'

export const prepareValidateValue = (
  validators: ValidatorStore,
  getValidationData: () => {}
) => {
  const { validate } = validators
  return function (value: any) {
    const validationResult = validate({
      data: getValidationData(),
      value
    })
    return validationResult.valid
  }
}