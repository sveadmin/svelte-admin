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
  onlyLowercaseValidator,
} from '../rules/index.js'

import type {
  OnlyLowercaseData,
  IsValid,
  ValidatorStore,
} from '../types.js'


describe('Test only lowercase validators', () => {
  it('Only lowercase validator works', async () => {
    const validator1: ValidatorStore = createFieldValidator([onlyLowercaseValidator()])

    const onlyLowercaseFails: IsValid = {
      message: 'Please enter a value which has only lower case letters!',
      error: 'VALUE_MUST_HAVE_ONLY_LOWERCASE',
      valid: false
    }

    expect(validator1.validate('asda')).toEqual({valid: true, validatedValue: ['asda']})
    expect(validator1.validate({value: 'asda'})).toEqual({valid: true, validatedValue: ['asda']})
    expect(validator1.validate(null)).toEqual(onlyLowercaseFails)
    expect(validator1.validate({value: null})).toEqual(onlyLowercaseFails)
    expect(validator1.validate({})).toEqual(onlyLowercaseFails)
    expect(validator1.validate([])).toEqual(onlyLowercaseFails)
    expect(validator1.validate('ASDASD')).toEqual(onlyLowercaseFails)
    expect(validator1.validate('ASdASD')).toEqual(onlyLowercaseFails)
  })

  it('Only lowercase validator works with injected store', async () => {
    let data : any = $state('asda')
    let param : OnlyLowercaseData = {get valueFallback () { return data }}
    let param2 : OnlyLowercaseData = {valueFallback: () => data }

    const validator1 = createFieldValidator([
      onlyLowercaseValidator(param)
    ])
    const validator2 = createFieldValidator([
      onlyLowercaseValidator(param2)
    ])

    const onlyLowercaseFails: IsValid = {
      message: 'Please enter a value which has only lower case letters!',
      error: 'VALUE_MUST_HAVE_ONLY_LOWERCASE',
      valid: false
    }

    expect(validator1.validate()).toEqual({valid: true, validatedValue: ['asda']})
    expect(validator1.validate({value: null, data: {valueFallback: 'qwer'}})).toEqual({valid: true, validatedValue: ['qwer']})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: ['asda']})
    expect(validator2.validate({value: null, data: {valueFallback: 'qwer'}})).toEqual({valid: true, validatedValue: ['qwer']})

    data = null
    expect(validator1.validate()).toEqual(onlyLowercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: null}})).toEqual(onlyLowercaseFails)
    expect(validator2.validate()).toEqual(onlyLowercaseFails)
    expect(validator2.validate({value: null, data: {valueFallback: null}})).toEqual(onlyLowercaseFails)
    data = undefined
    expect(validator1.validate()).toEqual(onlyLowercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: undefined}})).toEqual(onlyLowercaseFails)
    expect(validator2.validate()).toEqual(onlyLowercaseFails)
    expect(validator2.validate({value: null, data: {valueFallback: undefined}})).toEqual(onlyLowercaseFails)
    data = ''
    expect(validator1.validate()).toEqual(onlyLowercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: ''}})).toEqual(onlyLowercaseFails)
    expect(validator2.validate()).toEqual(onlyLowercaseFails)
    expect(validator2.validate({value: null, data: {valueFallback: ''}})).toEqual(onlyLowercaseFails)
    data = {}
    expect(validator1.validate()).toEqual(onlyLowercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: {a: 'b'}}})).toEqual(onlyLowercaseFails)
    expect(validator2.validate()).toEqual(onlyLowercaseFails)
    expect(validator2.validate({value: null, data: {valueFallback: {a: 'b'}}})).toEqual(onlyLowercaseFails)
    data = []
    expect(validator1.validate()).toEqual(onlyLowercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: ['b']}})).toEqual(onlyLowercaseFails)
    expect(validator2.validate()).toEqual(onlyLowercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: ['b']}})).toEqual(onlyLowercaseFails)
    data = 'ASDAAS'
    expect(validator1.validate()).toEqual(onlyLowercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: ['B']}})).toEqual(onlyLowercaseFails)
    expect(validator2.validate()).toEqual(onlyLowercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: ['B']}})).toEqual(onlyLowercaseFails)
    data = 'ASDaaS'
    expect(validator1.validate()).toEqual(onlyLowercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: 'qwerTY'}})).toEqual(onlyLowercaseFails)
    expect(validator2.validate()).toEqual(onlyLowercaseFails)
    expect(validator2.validate({value: null, data: {valueFallback: 'qwerTY'}})).toEqual(onlyLowercaseFails)
  })

  it('Only lowercase validator works with runes', async () => {
    const validator1: ValidatorStore = createFieldValidator([onlyLowercaseValidator()])

    const onlyLowercaseFails: IsValid = {
      message: 'Please enter a value which has only lower case letters!',
      error: 'VALUE_MUST_HAVE_ONLY_LOWERCASE',
      valid: false
    }

    let runedValue : Rune<string> = rune('')


    expect(validator1.validate(runedValue)).toEqual(onlyLowercaseFails)

    runedValue.set('test')
    expect(validator1.validate(runedValue)).toEqual({valid: true, validatedValue: ['test']})

    runedValue.value = 'TesT2'
    expect(validator1.validate(runedValue)).toEqual(onlyLowercaseFails)
  })
  it('Only lowercase validator works with custom error message', async () => {
    const errorMessage = 'This is a custom error message'
    const validator1: ValidatorStore = createFieldValidator([onlyLowercaseValidator({errorMessage})])

    const onlyLowercaseFails: IsValid = {
      message: '${This is a custom error message}(en_GB)',
      error: 'VALUE_MUST_HAVE_ONLY_LOWERCASE',
      valid: false
    }
    expect(validator1.validate('ASdsAD')).toEqual(onlyLowercaseFails)
  })
})