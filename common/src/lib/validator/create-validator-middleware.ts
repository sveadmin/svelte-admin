import type {
  AnyValidator,
  IsValid,
  ValidatorFunction,
} from './types.js'

export function createValidatorMiddleware (
    validators: ValidatorFunction[],
  ) {
  return function (params?: AnyValidator) : IsValid {
    let result: IsValid = {
      valid: true,
    }
    if (!validators || validators.length === 0) {
      return result
    }

    validators.find(v => {
      const validatorResult: IsValid = v(params)
      if (validatorResult.valid === true) {
        if (validatorResult.validatedValue) {
          if (!result.validatedValue) {
            result.validatedValue = []
          }
          result.validatedValue.push(validatorResult.validatedValue)
        }
        return false;
      }
      result = {
        ...validatorResult
      }
      return true;
    })

    return result
  }
}