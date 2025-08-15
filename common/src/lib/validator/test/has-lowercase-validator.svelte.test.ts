import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  rune,
} from '$lib/rune/index.js'

import type{
  Rune,
} from '$lib/rune/index.js'

import {
  createFieldValidator,
} from '../index.js'

import {
  hasLowercaseValidator,
} from '../rules/index.js'

import type {
  HasLowercaseData,
  IsValid,
  ValidatorStore,
} from '../types.js'


describe('Test has lowercase validators', () => {
  it('Lowercase validator works', async () => {
    const validator1: ValidatorStore = createFieldValidator([hasLowercaseValidator()])

    const hasLowercaseFails: IsValid = {
      message: 'Please enter a value which has at least one lower case letter!',
      error: 'VALUE_DOES_NOT_HAVE_LOWERCASE',
      valid: false
    }

    expect(validator1.validate('asda')).toEqual({valid: true, validatedValue: ['asda']})
    expect(validator1.validate({value: 'asda'})).toEqual({valid: true, validatedValue: ['asda']})
    expect(validator1.validate(null)).toEqual(hasLowercaseFails)
    expect(validator1.validate({value: null})).toEqual(hasLowercaseFails)
    expect(validator1.validate({})).toEqual(hasLowercaseFails)
    expect(validator1.validate([])).toEqual(hasLowercaseFails)
    expect(validator1.validate('ASDASD')).toEqual(hasLowercaseFails)
    expect(validator1.validate('ASdASD')).toEqual({valid: true, validatedValue: ['ASdASD']})
  })

  it('Has lowercase validator works with injected store', async () => {
    let data : any = $state('asda')
    let param : HasLowercaseData = {get valueFallback () { return data }}
    let param2 : HasLowercaseData = {valueFallback: () => data }

    const validator1 = createFieldValidator([
      hasLowercaseValidator(param)
    ])
    const validator2 = createFieldValidator([
      hasLowercaseValidator(param2)
    ])

    const hasLowercaseFails: IsValid = {
      message: 'Please enter a value which has at least one lower case letter!',
      error: 'VALUE_DOES_NOT_HAVE_LOWERCASE',
      valid: false
    }

    expect(validator1.validate()).toEqual({valid: true, validatedValue: ['asda']})
    expect(validator1.validate({value: null, data: {valueFallback: 'qwer'}})).toEqual({valid: true, validatedValue: ['qwer']})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: ['asda']})
    expect(validator2.validate({value: null, data: {valueFallback: 'qwer'}})).toEqual({valid: true, validatedValue: ['qwer']})

    data = null
    expect(validator1.validate()).toEqual(hasLowercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: null}})).toEqual(hasLowercaseFails)
    expect(validator2.validate()).toEqual(hasLowercaseFails)
    expect(validator2.validate({value: null, data: {valueFallback: null}})).toEqual(hasLowercaseFails)
    data = undefined
    expect(validator1.validate()).toEqual(hasLowercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: undefined}})).toEqual(hasLowercaseFails)
    expect(validator2.validate()).toEqual(hasLowercaseFails)
    expect(validator2.validate({value: null, data: {valueFallback: undefined}})).toEqual(hasLowercaseFails)
    data = ''
    expect(validator1.validate()).toEqual(hasLowercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: ''}})).toEqual(hasLowercaseFails)
    expect(validator2.validate()).toEqual(hasLowercaseFails)
    expect(validator2.validate({value: null, data: {valueFallback: ''}})).toEqual(hasLowercaseFails)
    data = {}
    expect(validator1.validate()).toEqual(hasLowercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: {a: 'b'}}})).toEqual(hasLowercaseFails)
    expect(validator2.validate()).toEqual(hasLowercaseFails)
    expect(validator2.validate({value: null, data: {valueFallback: {a: 'b'}}})).toEqual(hasLowercaseFails)
    data = []
    expect(validator1.validate()).toEqual(hasLowercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: ['b']}})).toEqual(hasLowercaseFails)
    expect(validator2.validate()).toEqual(hasLowercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: ['b']}})).toEqual(hasLowercaseFails)
    data = 'ASDAAS'
    expect(validator1.validate()).toEqual(hasLowercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: ['b']}})).toEqual(hasLowercaseFails)
    expect(validator2.validate()).toEqual(hasLowercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: ['b']}})).toEqual(hasLowercaseFails)
    data = 'ASDaaS'
    expect(validator1.validate()).toEqual({valid: true, validatedValue: ['ASDaaS']})
    expect(validator1.validate({value: null, data: {valueFallback: 'qwer'}})).toEqual({valid: true, validatedValue: ['qwer']})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: ['ASDaaS']})
    expect(validator2.validate({value: null, data: {valueFallback: 'qwer'}})).toEqual({valid: true, validatedValue: ['qwer']})
  })

  it('has lowercase validator works with runes', async () => {
    const validator1: ValidatorStore = createFieldValidator([hasLowercaseValidator()])

    const hasLowercaseFails: IsValid = {
      message: 'Please enter a value which has at least one lower case letter!',
      error: 'VALUE_DOES_NOT_HAVE_LOWERCASE',
      valid: false
    }

    let runedValue : Rune<string> = rune('')


    expect(validator1.validate(runedValue)).toEqual(hasLowercaseFails)

    runedValue.set('test')
    expect(validator1.validate(runedValue)).toEqual({valid: true, validatedValue: ['test']})

    runedValue.value = 'TEST2'
    expect(validator1.validate(runedValue)).toEqual(hasLowercaseFails)
  })
  it('has lowercase validator works with custom error message', async () => {
    const errorMessage = 'This is a custom error message'
    const validator1: ValidatorStore = createFieldValidator([hasLowercaseValidator({errorMessage})])

    const hasLowercaseFails: IsValid = {
      message: '${This is a custom error message}(en_GB)',
      error: 'VALUE_DOES_NOT_HAVE_LOWERCASE',
      valid: false
    }
    expect(validator1.validate('ASDSAD')).toEqual(hasLowercaseFails)
  })
})