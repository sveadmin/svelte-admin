import type {
  AnyValidator,
  AnyValidatorFunction,
  IsValid,
  ValidatorStore,
} from '../types.js'

export function nestedValidator (validator: ValidatorStore, nestedValue: AnyValidator | AnyValidatorFunction | any | {() : any}): (parameters?: AnyValidator) => IsValid {
  return function (parameters?: AnyValidator) : IsValid {
    const valueToCheck = (typeof nestedValue === 'function')
      ? nestedValue()
      : nestedValue
    if (!parameters
      || !parameters.skipValidation) {
      validator.validate({...nestedValue, value: valueToCheck.value ?? valueToCheck})
    }
    return validator.result
  }
}