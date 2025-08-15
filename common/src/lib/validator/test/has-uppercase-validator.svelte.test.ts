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
  hasUppercaseValidator,
} from '../rules/index.js'

import type {
  HasUppercaseData,
  IsValid,
  ValidatorStore,
} from '../types.js'


describe('Test has uppercase validators', () => {
  it('Uppercase validator works', async () => {
    const validator1: ValidatorStore = createFieldValidator([hasUppercaseValidator()])

    const hasUppercaseFails: IsValid = {
      message: 'Please enter a value which has at least one upper case letter!',
      error: 'VALUE_DOES_NOT_HAVE_UPPERCASE',
      valid: false
    }

    expect(validator1.validate('ASDA')).toEqual({valid: true, validatedValue: ['ASDA']})
    expect(validator1.validate({value: 'ASDA'})).toEqual({valid: true, validatedValue: ['ASDA']})
    expect(validator1.validate(null)).toEqual(hasUppercaseFails)
    expect(validator1.validate({value: null})).toEqual(hasUppercaseFails)
    expect(validator1.validate({})).toEqual(hasUppercaseFails)
    expect(validator1.validate([])).toEqual(hasUppercaseFails)
    expect(validator1.validate('asdasd')).toEqual(hasUppercaseFails)
    expect(validator1.validate('ASdASD')).toEqual({valid: true, validatedValue: ['ASdASD']})
  })

  it('Has uppercase validator works with injected store', async () => {
    let data : any = $state('ASDA')
    let param : HasUppercaseData = {get valueFallback () { return data }}
    let param2 : HasUppercaseData = {valueFallback: () => data }

    const validator1 = createFieldValidator([
      hasUppercaseValidator(param)
    ])
    const validator2 = createFieldValidator([
      hasUppercaseValidator(param2)
    ])

    const hasUppercaseFails: IsValid = {
      message: 'Please enter a value which has at least one upper case letter!',
      error: 'VALUE_DOES_NOT_HAVE_UPPERCASE',
      valid: false
    }

    expect(validator1.validate()).toEqual({valid: true, validatedValue: ['ASDA']})
    expect(validator1.validate({value: null, data: {valueFallback: 'QWER'}})).toEqual({valid: true, validatedValue: ['QWER']})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: ['ASDA']})
    expect(validator2.validate({value: null, data: {valueFallback: 'QWER'}})).toEqual({valid: true, validatedValue: ['QWER']})

    data = null
    expect(validator1.validate()).toEqual(hasUppercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: null}})).toEqual(hasUppercaseFails)
    expect(validator2.validate()).toEqual(hasUppercaseFails)
    expect(validator2.validate({value: null, data: {valueFallback: null}})).toEqual(hasUppercaseFails)
    data = undefined
    expect(validator1.validate()).toEqual(hasUppercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: undefined}})).toEqual(hasUppercaseFails)
    expect(validator2.validate()).toEqual(hasUppercaseFails)
    expect(validator2.validate({value: null, data: {valueFallback: undefined}})).toEqual(hasUppercaseFails)
    data = ''
    expect(validator1.validate()).toEqual(hasUppercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: ''}})).toEqual(hasUppercaseFails)
    expect(validator2.validate()).toEqual(hasUppercaseFails)
    expect(validator2.validate({value: null, data: {valueFallback: ''}})).toEqual(hasUppercaseFails)
    data = {}
    expect(validator1.validate()).toEqual(hasUppercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: {a: 'b'}}})).toEqual(hasUppercaseFails)
    expect(validator2.validate()).toEqual(hasUppercaseFails)
    expect(validator2.validate({value: null, data: {valueFallback: {a: 'b'}}})).toEqual(hasUppercaseFails)
    data = []
    expect(validator1.validate()).toEqual(hasUppercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: ['b']}})).toEqual(hasUppercaseFails)
    expect(validator2.validate()).toEqual(hasUppercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: ['b']}})).toEqual(hasUppercaseFails)
    data = 'asdasd'
    expect(validator1.validate()).toEqual(hasUppercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: ['B']}})).toEqual(hasUppercaseFails)
    expect(validator2.validate()).toEqual(hasUppercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: ['B']}})).toEqual(hasUppercaseFails)
    data = 'ASDaaS'
    expect(validator1.validate()).toEqual({valid: true, validatedValue: ['ASDaaS']})
    expect(validator1.validate({value: null, data: {valueFallback: 'qWer'}})).toEqual({valid: true, validatedValue: ['qWer']})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: ['ASDaaS']})
    expect(validator2.validate({value: null, data: {valueFallback: 'qWer'}})).toEqual({valid: true, validatedValue: ['qWer']})
  })

  it('has uppercase validator works with runes', async () => {
    const validator1: ValidatorStore = createFieldValidator([hasUppercaseValidator()])

    const hasUppercaseFails: IsValid = {
      message: 'Please enter a value which has at least one upper case letter!',
      error: 'VALUE_DOES_NOT_HAVE_UPPERCASE',
      valid: false
    }

    let runedValue : Rune<string> = rune('')


    expect(validator1.validate(runedValue)).toEqual(hasUppercaseFails)

    runedValue.set('TEST')
    expect(validator1.validate(runedValue)).toEqual({valid: true, validatedValue: ['TEST']})

    runedValue.value = 'test2'
    expect(validator1.validate(runedValue)).toEqual(hasUppercaseFails)
  })
  it('has uppercase validator works with custom error message', async () => {
    const errorMessage = 'This is a custom error message'
    const validator1: ValidatorStore = createFieldValidator([hasUppercaseValidator({errorMessage})])

    const hasUppercaseFails: IsValid = {
      message: '${This is a custom error message}(en_GB)',
      error: 'VALUE_DOES_NOT_HAVE_UPPERCASE',
      valid: false
    }
    expect(validator1.validate('asdasd')).toEqual(hasUppercaseFails)
  })
})