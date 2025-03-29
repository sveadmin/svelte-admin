import type {
  AnyValidator,
  AnyValidatorFunction,
  IsValid,
  ValidatorStore,
} from '../types.js'

export function nestedValidator (validator: ValidatorStore, nestedValue: AnyValidator | AnyValidatorFunction | any | {() : any}): (params: AnyValidator, validate?: boolean) => IsValid {
  return function (params: AnyValidator) : IsValid {
    const valueToCheck = (typeof nestedValue === 'function')
      ? nestedValue()
      : nestedValue
    if (!params.skipValidation) {
      validator.validate({...nestedValue, value: valueToCheck.value ?? valueToCheck})
    }
    return validator.result
  }
}