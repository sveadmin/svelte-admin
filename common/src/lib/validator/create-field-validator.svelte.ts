import { createValidatorMiddleware } from './create-validator-middleware.js'
import { i18n } from '../i18n/index.js'
import * as translations from './translation/index.js'
import type {
  AnyValidator,
  IsValid,
  StringValidator,
  ValidatorFunction,
  ValidatorStore,
} from './types.js'

i18n.addMultipleLocales(translations)

export function createFieldValidator (validators: ValidatorFunction[] = []) : ValidatorStore {
  const store : {result: IsValid} = $state({
    result: {
      valid: true,
    }
  })
  const validator = createValidatorMiddleware([], getValidators)

  function getValidators() : ValidatorFunction[] {
    return validators
  }

  function validate (params?: AnyValidator) : IsValid {
    store.result = validator(params)
    return store.result
  }

  function validateElement (event: Event) : IsValid {
    const target = event.target as HTMLInputElement //TODO: How to check selects...
    return validate({value: target.value})
  }

  return {
    appendValidator: (validator: ValidatorFunction) : void => {
      validators.push(validator)
    },
    prependValidator: (validator: ValidatorFunction) : void => {
      validators.unshift(validator)
    },
    getValidators,
    get result() { return store.result },
    validate,
    validateElement,
  }
}
