//In theory it is possible to use classes instead of the functionn middleware, but as 
//runes in classes does not offer any added functionality, this part remains as test
//some reading to maybe improve on usability: https://dev.to/jdgamble555/create-the-perfect-sharable-rune-in-svelte-ij8 

import { i18n } from '../i18n/index.js'
import * as translations from './translation/index.js'

i18n.addMultipleLocales(translations)

import type {
  AnyValidator,
    IsValid,
    StringValidator,
    Validator,
    ValidatorFunction,
    ValueFallback
} from './types.js'

import {
  VALUE_REQUIRED,
} from './errors.js'


export class RequiredValidator implements Validator {
  data: ValueFallback = {}

  constructor(data?: ValueFallback) {
    if (data) {
      this.data = data
    }
  }

  validate = (parameters: AnyValidator | any) : IsValid => {
    let value = (parameters && parameters.hasOwnProperty('value'))
      ? parameters.value
      : parameters
    // if (!value
    //   && parameters?.data?.valueFallback) {
    //   value = (typeof parameters?.data?.valueFallback) ? parameters.data.valueFallback() : parameters.data.valueFallback  
    // }
    if (!value
      && this.data?.valueFallback) {
      value = this.data.valueFallback  
    }
  console.log('value:', value)

    if (value !== undefined
      && value !== null
      && value !== '') {
      return {
        valid: true,
        validatedValue: value,
      }
    }
    return {
      message: i18n.t(VALUE_REQUIRED) ?? VALUE_REQUIRED,
      error: VALUE_REQUIRED,
      valid: false
    }

  }
}

export class FieldValidator {
  result: IsValid = $state({
    valid: true,
  })

  validators: Validator[] = $state([])

  constructor(validators?: Validator[]) {
    if (validators) {
      this.validators = validators
    }
  } 

  validate = (params?: AnyValidator & StringValidator | any) : IsValid => {
      let result: IsValid = {
        valid: true,
        validatedValue: [],
      }
      if (!this.validators || this.validators.length === 0) {
        return result
      }
  
      this.validators.find(v => {
        const validatorResult: IsValid = v.validate(params)
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