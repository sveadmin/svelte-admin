import { createValidatorMiddleware } from './create-validator-middleware.js'
import { i18n } from '../i18n/index.js'
import * as translations from './translation/index.js'
import {
  identityKey,
} from './types.js'

import type {
  AnyValidator,
  IsValid,
  ValidatorFunction,
  ValidatorStore,
  ValidatorStoreData,
} from './types.js'

i18n.addMultipleLocales(translations)

export function createFieldValidator (validators: ValidatorFunction[] | ValidatorStore = []) : ValidatorStore {
  // This is needed to make the validator setup independently reusable, especially for clusters
  const validatorFunctions : ValidatorFunction[] = (Array.isArray(validators))
    ? [...validators]
    : [...validators.validators]

  const store : ValidatorStoreData = $state({
    identities: validatorFunctions.map(vf => vf[identityKey]),
    result: {
      valid: true,
    },
    get validators() { return validatorFunctions }
  })
  const validator = createValidatorMiddleware(store.validators)

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
      validatorFunctions.push(validator)
      store.identities.push(validator[identityKey])
    },
    identities: store.identities,
    prependValidator: (validator: ValidatorFunction) : void => {
      validatorFunctions.unshift(validator)
      store.identities.unshift(validator[identityKey])
    },
    get result() { return store.result },
    set result(result: IsValid) {store.result = result},
    validate,
    validateElement,
    get validators() { return store.validators }, 
  }
}
