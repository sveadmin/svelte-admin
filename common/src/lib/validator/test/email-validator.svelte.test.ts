import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  createFieldValidator,
} from '../index.js'

import {
  emailValidator,
} from '../rules/index.js'

import type {
  IsValid,
  ValidatorStore,
} from '../types.js'


describe('Test email validators', () => {
  it('Email validator works', async () => {
    const validator1: ValidatorStore = createFieldValidator([emailValidator()])

    const emailFails: IsValid = {
      message: 'Please enter a valid email!',
      error: 'INVALID_EMAIL',
      valid: false
    }

    expect(validator1.validate('a@b.com')).toEqual({valid: true, validatedValue: ['a@b.com']})
    expect(validator1.validate({value: 'a@b.com'})).toEqual({valid: true, validatedValue: ['a@b.com']})
    expect(validator1.validate('a+test@b.com')).toEqual({valid: true, validatedValue: ['a+test@b.com']})
    expect(validator1.validate({value: 'a+test@b.com'})).toEqual({valid: true, validatedValue: ['a+test@b.com']})
    expect(validator1.validate('a@b.com.bo')).toEqual({valid: true, validatedValue: ['a@b.com.bo']})
    expect(validator1.validate({value: 'a@b.com.bo'})).toEqual({valid: true, validatedValue: ['a@b.com.bo']})
    expect(validator1.validate('a@b.co.ke')).toEqual({valid: true, validatedValue: ['a@b.co.ke']})
    expect(validator1.validate({value: 'a@b.co.ke'})).toEqual({valid: true, validatedValue: ['a@b.co.ke']})
    expect(validator1.validate('a[at]b.com')).toEqual(emailFails)
    expect(validator1.validate({value: 'a[at]b.com'})).toEqual(emailFails)
    expect(validator1.validate('this is not an email')).toEqual(emailFails)
    expect(validator1.validate({value: 'this is not an email'})).toEqual(emailFails)
    expect(validator1.validate(null)).toEqual(emailFails)
    expect(validator1.validate({value: null})).toEqual(emailFails)
  })

  it('Email validator works with runes', async () => {
    let email : string | null = $state('a@b.com')
    const validator1: ValidatorStore = createFieldValidator([emailValidator({get valueFallback () { return email }})])
    const validator2: ValidatorStore = createFieldValidator([emailValidator({valueFallback: () => email})])

    const emailFails: IsValid = {
      message: 'Please enter a valid email!',
      error: 'INVALID_EMAIL',
      valid: false
    }

    expect(validator1.validate()).toEqual({valid: true, validatedValue: ['a@b.com']})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: ['a@b.com']})
    expect(validator1.validate({data: {valueFallback: 'b@b.com'}})).toEqual({valid: true, validatedValue: ['b@b.com']})
    expect(validator2.validate({data: {valueFallback: 'b@b.com'}})).toEqual({valid: true, validatedValue: ['b@b.com']})

    email = 'a+test@b.com'
    expect(validator1.validate()).toEqual({valid: true, validatedValue: ['a+test@b.com']})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: ['a+test@b.com']})
    expect(validator1.validate({data: {valueFallback: 'a+test2@b.com'}})).toEqual({valid: true, validatedValue: ['a+test2@b.com']})
    expect(validator2.validate({data: {valueFallback: 'a+test2@b.com'}})).toEqual({valid: true, validatedValue: ['a+test2@b.com']})

    email = 'a@b.com.bo'
    expect(validator1.validate()).toEqual({valid: true, validatedValue: ['a@b.com.bo']})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: ['a@b.com.bo']})
    expect(validator1.validate({data: {valueFallback: 'b@b.com.bo'}})).toEqual({valid: true, validatedValue: ['b@b.com.bo']})
    expect(validator2.validate({data: {valueFallback: 'b@b.com.bo'}})).toEqual({valid: true, validatedValue: ['b@b.com.bo']})

    email = 'a@b.co.ke'
    expect(validator1.validate()).toEqual({valid: true, validatedValue: ['a@b.co.ke']})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: ['a@b.co.ke']})
    expect(validator1.validate({data: {valueFallback: 'b@b.co.ke'}})).toEqual({valid: true, validatedValue: ['b@b.co.ke']})
    expect(validator2.validate({data: {valueFallback: 'b@b.co.ke'}})).toEqual({valid: true, validatedValue: ['b@b.co.ke']})

    email = 'a[at]b.com'
    expect(validator1.validate()).toEqual(emailFails)
    expect(validator2.validate()).toEqual(emailFails)
    expect(validator1.validate({data: {valueFallback: 'a[at]b.com'}})).toEqual(emailFails)
    expect(validator2.validate({data: {valueFallback: 'a[at]b.com'}})).toEqual(emailFails)

    email = 'this is not an email'
    expect(validator1.validate()).toEqual(emailFails)
    expect(validator2.validate()).toEqual(emailFails)
    expect(validator1.validate({data: {valueFallback: 'this is not an email'}})).toEqual(emailFails)
    expect(validator2.validate({data: {valueFallback: 'this is not an email'}})).toEqual(emailFails)

    email = null
    expect(validator1.validate()).toEqual(emailFails)
    expect(validator2.validate()).toEqual(emailFails)
    expect(validator1.validate({data: {valueFallback: null}})).toEqual(emailFails)
    expect(validator2.validate({data: {valueFallback: null}})).toEqual(emailFails)
  })
  it('Email validator works with custom error message', async () => {
    const errorMessage = 'This is a custom error message'
    const validator1: ValidatorStore = createFieldValidator([emailValidator({
      errorMessage
    })])

    const emailFails: IsValid = {
      message: '${This is a custom error message}(en_GB)',
      error: 'INVALID_EMAIL',
      valid: false
    }

    expect(validator1.validate('a')).toEqual(emailFails)
  })
})