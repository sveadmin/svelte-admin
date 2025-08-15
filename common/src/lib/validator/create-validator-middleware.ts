import type {
  AnyValidator,
  DynamicValidatorFunction,
  IsValid,
  StringValidator,
  ValidatorFunction,
} from './types.js'

export function createValidatorMiddleware (
    validators: ValidatorFunction[],
    getValidators?: DynamicValidatorFunction
  ) {
  return function (params?: AnyValidator) : IsValid {
    const validatorFunctions: ValidatorFunction[] = (getValidators) ? getValidators() : validators
    let result: IsValid = {
      valid: true,
      validatedValue: [],
    }
    if (!validatorFunctions || validatorFunctions.length === 0) {
      return result
    }

    validatorFunctions.find(v => {
      const validatorResult: IsValid = v(params)
      if (validatorResult.valid === true) {
        if (validatorResult.validatedValue) {
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