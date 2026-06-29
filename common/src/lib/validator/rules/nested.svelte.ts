import {
  identityKey,
} from '../types.js'

import type {
  AnyValidator,
  AnyValidatorFunction,
  IsValid,
  ValidatorStore,
} from '../types.js'

function getIdentity(): string {
  return `nested`
}

export function nestedValidator (validator: ValidatorStore, nestedValue?: AnyValidator | AnyValidatorFunction | any | {() : any}): (parameters?: AnyValidator) => IsValid {
  function validatorFunction(parameters?: AnyValidator) : IsValid {
    const valueToCheck = (typeof nestedValue === 'function')
      ? nestedValue()
      : nestedValue
    if (!valueToCheck) {
      return validator.result
    }
    if (parameters
      && parameters.skipValidation) {
      return validator.result
    }
    validator.validate({...nestedValue, value: valueToCheck.value ?? valueToCheck})
    return validator.result
  }

  validatorFunction[identityKey] = getIdentity()
  return validatorFunction
}