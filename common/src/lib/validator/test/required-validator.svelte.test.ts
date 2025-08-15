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
  requiredValidator,
} from '../rules/index.js'

import type {
  IsValid,
  ValidatorStore,
  ValueFallback,
} from '../types.js'


describe('Test required validators', () => {
  it('Required validator works', async () => {
    const validator1: ValidatorStore = createFieldValidator([requiredValidator()])

    const requiredFails: IsValid = {
      message: 'Please provide a value!',
      error: 'VALUE_REQUIRED',
      valid: false
    }

    expect(validator1.validate('asda')).toEqual({valid: true, validatedValue: ['asda']})
    expect(validator1.validate({value: 'asda'})).toEqual({valid: true, validatedValue: ['asda']})
    expect(validator1.validate(null)).toEqual(requiredFails)
    expect(validator1.validate({value: null})).toEqual(requiredFails)
    expect(validator1.validate({value: 'asda'})).toEqual({valid: true, validatedValue: ['asda']}) //No residue after a failed check
    expect(validator1.validate({})).toEqual({valid: true, validatedValue: [{}]})
    expect(validator1.validate([])).toEqual({valid: true, validatedValue: [[]]})
  })

  it('Required validator works with injected store', async () => {
    let data : any = $state('asda')
    let param : ValueFallback = {get valueFallback () { return data }}
    let param2 : ValueFallback = {valueFallback: () => data }

    const validator1 = createFieldValidator([
      requiredValidator(param)
    ])
    const validator2 = createFieldValidator([
      requiredValidator(param2)
    ])

    const requiredFails: IsValid = {
      message: 'Please provide a value!',
      error: 'VALUE_REQUIRED',
      valid: false
    }

    expect(validator1.validate()).toEqual({valid: true, validatedValue: ['asda']})
    expect(validator1.validate({value: null, data: {valueFallback: 'qwer'}})).toEqual({valid: true, validatedValue: ['qwer']})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: ['asda']})
    expect(validator2.validate({value: null, data: {valueFallback: 'qwer'}})).toEqual({valid: true, validatedValue: ['qwer']})

    data = null
    expect(validator1.validate()).toEqual(requiredFails)
    expect(validator1.validate({value: null, data: {valueFallback: null}})).toEqual(requiredFails)
    expect(validator2.validate()).toEqual(requiredFails)
    expect(validator2.validate({value: null, data: {valueFallback: null}})).toEqual(requiredFails)
    data = undefined
    expect(validator1.validate()).toEqual(requiredFails)
    expect(validator1.validate({value: null, data: {valueFallback: undefined}})).toEqual(requiredFails)
    expect(validator2.validate()).toEqual(requiredFails)
    expect(validator2.validate({value: null, data: {valueFallback: undefined}})).toEqual(requiredFails)
    data = ''
    expect(validator1.validate()).toEqual(requiredFails)
    expect(validator1.validate({value: null, data: {valueFallback: ''}})).toEqual(requiredFails)
    expect(validator2.validate()).toEqual(requiredFails)
    expect(validator2.validate({value: null, data: {valueFallback: ''}})).toEqual(requiredFails)
    data = {}
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{}]})
    expect(validator1.validate({value: null, data: {valueFallback: {a: 'b'}}})).toEqual({valid: true, validatedValue: [{a: 'b'}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{}]})
    expect(validator2.validate({value: null, data: {valueFallback: {a: 'b'}}})).toEqual({valid: true, validatedValue: [{a: 'b'}]})
    data = []
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [[]]})
    expect(validator1.validate({value: null, data: {valueFallback: ['b']}})).toEqual({valid: true, validatedValue: [['b']]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [[]]})
    expect(validator1.validate({value: null, data: {valueFallback: ['b']}})).toEqual({valid: true, validatedValue: [['b']]})
  })

  it('Required validator works with runes', async () => {
    const validator1: ValidatorStore = createFieldValidator([requiredValidator()])

    const requiredFails: IsValid = {
      message: 'Please provide a value!',
      error: 'VALUE_REQUIRED',
      valid: false
    }

    let runedValue : Rune<string> = rune('')


    expect(validator1.validate(runedValue)).toEqual(requiredFails)

    runedValue.set('test')
    expect(validator1.validate(runedValue)).toEqual({valid: true, validatedValue: ['test']})

    runedValue.value = 'test2'
    expect(validator1.validate(runedValue)).toEqual({valid: true, validatedValue: ['test2']})
  })
  it('Required validator works with custom error message', async () => {
    const errorMessage = 'This is a custom error message'
    const validator1: ValidatorStore = createFieldValidator([requiredValidator({errorMessage})])

    const requiredFails: IsValid = {
      message: '${This is a custom error message}(en_GB)',
      error: 'VALUE_REQUIRED',
      valid: false
    }

    expect(validator1.validate(null)).toEqual(requiredFails)
  })
})