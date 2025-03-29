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
  return function (params: AnyValidator | StringValidator) : IsValid {
    const validatorFunctions: ValidatorFunction[] = (getValidators) ? getValidators() : validators
    let result: IsValid = {
      valid: true,
    }
    if (!validatorFunctions || validatorFunctions.length === 0) {
      return result
    }

    validatorFunctions.find(v => {
      const validatorResult: IsValid = v(params)
      if (validatorResult.valid === true) {
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