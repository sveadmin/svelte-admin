import type {
  IsValid,
  OrValidatorData,
  ValidatorFunction,
} from '../types.js'

import {
  createValidatorMiddleware,
} from '../create-validator-middleware.js'

export function orValidator(parameters: OrValidatorData) : IsValid {
  const {
    orValidators,
    previousResult,
    value
  } = parameters

  if (!orValidators) {
    return previousResult
  }

  const validate = createValidatorMiddleware(orValidators)

  const isValid: IsValid = validate({value})

  if (isValid.valid) {
    return isValid
  }

  return {
    ...previousResult,
    message: [previousResult.message, isValid.message].join(' OR '),
    error: [previousResult.error, isValid.error].join(', '),
  }
}