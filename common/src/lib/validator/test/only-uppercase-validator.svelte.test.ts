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
  onlyUppercaseValidator,
} from '../rules/index.js'

import type {
  OnlyUppercaseData,
  IsValid,
  ValidatorStore,
} from '../types.js'


describe('Test only uppercase validators', () => {
  it('Only uppercase validator works', async () => {
    const validator1: ValidatorStore = createFieldValidator([onlyUppercaseValidator()])

    const onlyUppercaseFails: IsValid = {
      message: 'Please enter a value which has only upper case letters!',
      error: 'VALUE_MUST_HAVE_ONLY_UPPERCASE',
      valid: false
    }

    expect(validator1.validate('ASDA')).toEqual({valid: true, validatedValue: ['ASDA']})
    expect(validator1.validate({value: 'ASDA'})).toEqual({valid: true, validatedValue: ['ASDA']})
    expect(validator1.validate(null)).toEqual(onlyUppercaseFails)
    expect(validator1.validate({value: null})).toEqual(onlyUppercaseFails)
    expect(validator1.validate({})).toEqual(onlyUppercaseFails)
    expect(validator1.validate([])).toEqual(onlyUppercaseFails)
    expect(validator1.validate('asdasd')).toEqual(onlyUppercaseFails)
    expect(validator1.validate('ASdASD')).toEqual(onlyUppercaseFails)
  })

  it('Only uppercase validator works with injected store', async () => {
    let data : any = $state('ASDA')
    let param : OnlyUppercaseData = {get valueFallback () { return data }}
    let param2 : OnlyUppercaseData = {valueFallback: () => data }

    const validator1 = createFieldValidator([
      onlyUppercaseValidator(param)
    ])
    const validator2 = createFieldValidator([
      onlyUppercaseValidator(param2)
    ])

    const onlyUppercaseFails: IsValid = {
      message: 'Please enter a value which has only upper case letters!',
      error: 'VALUE_MUST_HAVE_ONLY_UPPERCASE',
      valid: false
    }

    expect(validator1.validate()).toEqual({valid: true, validatedValue: ['ASDA']})
    expect(validator1.validate({value: null, data: {valueFallback: 'QWER'}})).toEqual({valid: true, validatedValue: ['QWER']})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: ['ASDA']})
    expect(validator2.validate({value: null, data: {valueFallback: 'QWER'}})).toEqual({valid: true, validatedValue: ['QWER']})

    data = null
    expect(validator1.validate()).toEqual(onlyUppercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: null}})).toEqual(onlyUppercaseFails)
    expect(validator2.validate()).toEqual(onlyUppercaseFails)
    expect(validator2.validate({value: null, data: {valueFallback: null}})).toEqual(onlyUppercaseFails)
    data = undefined
    expect(validator1.validate()).toEqual(onlyUppercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: undefined}})).toEqual(onlyUppercaseFails)
    expect(validator2.validate()).toEqual(onlyUppercaseFails)
    expect(validator2.validate({value: null, data: {valueFallback: undefined}})).toEqual(onlyUppercaseFails)
    data = ''
    expect(validator1.validate()).toEqual(onlyUppercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: ''}})).toEqual(onlyUppercaseFails)
    expect(validator2.validate()).toEqual(onlyUppercaseFails)
    expect(validator2.validate({value: null, data: {valueFallback: ''}})).toEqual(onlyUppercaseFails)
    data = {}
    expect(validator1.validate()).toEqual(onlyUppercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: {a: 'b'}}})).toEqual(onlyUppercaseFails)
    expect(validator2.validate()).toEqual(onlyUppercaseFails)
    expect(validator2.validate({value: null, data: {valueFallback: {a: 'b'}}})).toEqual(onlyUppercaseFails)
    data = []
    expect(validator1.validate()).toEqual(onlyUppercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: ['b']}})).toEqual(onlyUppercaseFails)
    expect(validator2.validate()).toEqual(onlyUppercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: ['b']}})).toEqual(onlyUppercaseFails)
    data = 'asddas'
    expect(validator1.validate()).toEqual(onlyUppercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: ['B']}})).toEqual(onlyUppercaseFails)
    expect(validator2.validate()).toEqual(onlyUppercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: ['B']}})).toEqual(onlyUppercaseFails)
    data = 'ASDaaS'
    expect(validator1.validate()).toEqual(onlyUppercaseFails)
    expect(validator1.validate({value: null, data: {valueFallback: 'qwerTY'}})).toEqual(onlyUppercaseFails)
    expect(validator2.validate()).toEqual(onlyUppercaseFails)
    expect(validator2.validate({value: null, data: {valueFallback: 'qwerTY'}})).toEqual(onlyUppercaseFails)
  })

  it('Only uppercase validator works with runes', async () => {
    const validator1: ValidatorStore = createFieldValidator([onlyUppercaseValidator()])

    const onlyUppercaseFails: IsValid = {
      message: 'Please enter a value which has only upper case letters!',
      error: 'VALUE_MUST_HAVE_ONLY_UPPERCASE',
      valid: false
    }

    let runedValue : Rune<string> = rune('')


    expect(validator1.validate(runedValue)).toEqual(onlyUppercaseFails)

    runedValue.set('TEST123')
    expect(validator1.validate(runedValue)).toEqual({valid: true, validatedValue: ['TEST123']})

    runedValue.value = 'TesT2'
    expect(validator1.validate(runedValue)).toEqual(onlyUppercaseFails)
  })
  it('Only uppercase validator works with custom error message', async () => {
    const errorMessage = 'This is a custom error message'
    const validator1: ValidatorStore = createFieldValidator([onlyUppercaseValidator({errorMessage})])

    const onlyUppercaseFails: IsValid = {
      message: '${This is a custom error message}(en_GB)',
      error: 'VALUE_MUST_HAVE_ONLY_UPPERCASE',
      valid: false
    }
    expect(validator1.validate('ASdsAD')).toEqual(onlyUppercaseFails)
  })
})