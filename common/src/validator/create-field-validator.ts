import {
  writable,
  Writable
} from 'svelte/store'
import { createValidatorMiddleware } from './create-validator-middleware.js'
import { i18n } from '../i18n/index.js'
import * as translations from './translation/index.js'
import {
  AnyValidator,
  IsValid,
  StringValidator,
  ValidatorFunction,
  ValidatorStore,
} from './types.js'

i18n.addMultipleLocales(translations)

export function createFieldValidator (validators: ValidatorFunction[] = []) : ValidatorStore {
  const store : Writable<IsValid> = writable({ dirty: false, valid: false, message: null })
  const { subscribe, set } = store
  const validator = createValidatorMiddleware([], getValidators)

  function getValidators() : ValidatorFunction[] {
    return validators
  }

  function validate (params: AnyValidator | StringValidator) : IsValid {
    const result = validator(params)
    set(result)
    return result
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
    subscribe,
    validate,
    validateElement,
  }
}
