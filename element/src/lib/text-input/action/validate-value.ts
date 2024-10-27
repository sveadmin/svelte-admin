import {
  status,
  type ValidatorStore,
} from '@sveadmin/common'

import type {
  Shaker,
} from '$lib/helper/types.js'

export const prepareValidateValue = (
  validators: ValidatorStore,
  getValidationData: () => {},
  textPadding: Shaker
) => {
  const { validate } = validators
  return function (value: any) {
    const validationResult = validate({
      data: getValidationData(),
      value
    })
    if (!validationResult.valid) {
      status.add({message: validationResult.message ?? '', type: 'error'});
      textPadding.shake()
      return false;
    }
    return true
  }
}