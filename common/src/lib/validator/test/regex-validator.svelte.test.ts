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
  regexValidator,
} from '../rules/index.js'

import type {
  IsValid,
  ValidatorStore,
  RegexValidatorData,
} from '../types.js'


describe('Test regex validators', () => {
  it('Required validator works', async () => {
    const validator1: ValidatorStore = createFieldValidator([regexValidator({pattern :'[a-z]+'})])
    const validator2: ValidatorStore = createFieldValidator([regexValidator({pattern :/[a-z]+/})])
    const validator3: ValidatorStore = createFieldValidator([regexValidator({pattern :/[a-z]+/i})])

    const regexFails: IsValid = {
      message: 'Please select a different value, this does not match the required pattern! /[a-z]+/',
      error: 'VALUE_DOES_NOT_MATCH_PATTERN',
      valid: false
    }

    const regexFailsCaseInsensitive: IsValid = {
      message: 'Please select a different value, this does not match the required pattern! /[a-z]+/i',
      error: 'VALUE_DOES_NOT_MATCH_PATTERN',
      valid: false
    }

    expect(validator1.validate('asda')).toEqual({valid: true, validatedValue: ['asda']})
    expect(validator1.validate({value: 'asda'})).toEqual({valid: true, validatedValue: ['asda']})
    expect(validator1.validate(null)).toEqual(regexFails)
    expect(validator1.validate({value: null})).toEqual(regexFails)
    expect(validator1.validate({value: 'asda'})).toEqual({valid: true, validatedValue: ['asda']}) //No residue after a failed check
    expect(validator1.validate({})).toEqual({valid: true, validatedValue: [{}]}) //As to string creates [object Object] of the value
    expect(validator1.validate([])).toEqual(regexFails)
    expect(validator1.validate('ASDASD')).toEqual(regexFails)
    expect(validator1.validate({value: 'ASDASD'})).toEqual(regexFails)

    expect(validator2.validate('asda')).toEqual({valid: true, validatedValue: ['asda']})
    expect(validator2.validate({value: 'asda'})).toEqual({valid: true, validatedValue: ['asda']})
    expect(validator2.validate(null)).toEqual(regexFails)
    expect(validator2.validate({value: null})).toEqual(regexFails)
    expect(validator2.validate({value: 'asda'})).toEqual({valid: true, validatedValue: ['asda']}) //No residue after a failed check
    expect(validator2.validate({})).toEqual({valid: true, validatedValue: [{}]}) //As to string creates [object Object] of the value
    expect(validator2.validate([])).toEqual(regexFails)
    expect(validator2.validate('ASDASD')).toEqual(regexFails)
    expect(validator2.validate({value: 'ASDASD'})).toEqual(regexFails)

    expect(validator3.validate('asda')).toEqual({valid: true, validatedValue: ['asda']})
    expect(validator3.validate({value: 'asda'})).toEqual({valid: true, validatedValue: ['asda']})
    expect(validator3.validate(null)).toEqual(regexFailsCaseInsensitive)
    expect(validator3.validate({value: null})).toEqual(regexFailsCaseInsensitive)
    expect(validator3.validate({value: 'asda'})).toEqual({valid: true, validatedValue: ['asda']}) //No residue after a failed check
    expect(validator3.validate({})).toEqual({valid: true, validatedValue: [{}]}) //As to string creates [object Object] of the value
    expect(validator3.validate([])).toEqual(regexFailsCaseInsensitive)
    expect(validator3.validate('ASDASD')).toEqual({valid: true, validatedValue: ['ASDASD']})
    expect(validator3.validate({value: 'ASDASD'})).toEqual({valid: true, validatedValue: ['ASDASD']})
  })

  it('Required validator works with injected store', async () => {
    let data: any = $state('asda')
    let param: RegexValidatorData = {
      pattern:'[a-z]+',
      get valueFallback () { return data }
    }
    let param2 : RegexValidatorData = {
      pattern:'[a-z]+',
      valueFallback: () => data
    }

    let param3 : RegexValidatorData = {
      pattern: /[a-z]+/i,
      valueFallback: () => data
    }

    const validator1 = createFieldValidator([
      regexValidator(param)
    ])
    const validator2 = createFieldValidator([
      regexValidator(param2)
    ])
    const validator3 = createFieldValidator([
      regexValidator(param3)
    ])

    const regexFails: IsValid = {
      message: 'Please select a different value, this does not match the required pattern! /[a-z]+/',
      error: 'VALUE_DOES_NOT_MATCH_PATTERN',
      valid: false
    }

    const regexFailsCaseInsensitive: IsValid = {
      message: 'Please select a different value, this does not match the required pattern! /[a-z]+/i',
      error: 'VALUE_DOES_NOT_MATCH_PATTERN',
      valid: false
    }

    expect(validator1.validate()).toEqual({valid: true, validatedValue: ['asda']})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: ['asda']})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: ['asda']})

    data = null
    expect(validator1.validate()).toEqual(regexFails)
    expect(validator2.validate()).toEqual(regexFails)
    expect(validator3.validate()).toEqual(regexFailsCaseInsensitive)

    data = {}
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{}]}) //As to string creates [object Object] of the value
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{}]}) //As to string creates [object Object] of the value
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{}]}) //As to string creates [object Object] of the value
    
    data = []
    expect(validator1.validate()).toEqual(regexFails)
    expect(validator2.validate()).toEqual(regexFails)
    expect(validator3.validate()).toEqual(regexFailsCaseInsensitive)

    data = 'ASDASD'
    expect(validator1.validate()).toEqual(regexFails)
    expect(validator2.validate()).toEqual(regexFails)
    expect(validator3.validate()).toEqual({valid: true, validatedValue: ['ASDASD']})

  })

  it('Required validator works with runes', async () => {
    const validator1: ValidatorStore = createFieldValidator([regexValidator({pattern :'[a-z]+'})])
    const validator2: ValidatorStore = createFieldValidator([regexValidator({pattern :/[a-z]+/})])
    const validator3: ValidatorStore = createFieldValidator([regexValidator({pattern :/[a-z]+/i})])

    const regexFails: IsValid = {
      message: 'Please select a different value, this does not match the required pattern! /[a-z]+/',
      error: 'VALUE_DOES_NOT_MATCH_PATTERN',
      valid: false
    }

    const regexFailsCaseInsensitive: IsValid = {
      message: 'Please select a different value, this does not match the required pattern! /[a-z]+/i',
      error: 'VALUE_DOES_NOT_MATCH_PATTERN',
      valid: false
    }

    let runedValue : Rune<string> = rune('asda')

    expect(validator1.validate(runedValue)).toEqual({valid: true, validatedValue: ['asda']})
    expect(validator2.validate(runedValue)).toEqual({valid: true, validatedValue: ['asda']})
    expect(validator3.validate(runedValue)).toEqual({valid: true, validatedValue: ['asda']})


    runedValue.set('ASDASD')
    expect(validator1.validate(runedValue)).toEqual(regexFails)
    expect(validator2.validate(runedValue)).toEqual(regexFails)
    expect(validator3.validate(runedValue)).toEqual({valid: true, validatedValue: ['ASDASD']})

    runedValue.set('')
    expect(validator1.validate(runedValue)).toEqual(regexFails)
    expect(validator2.validate(runedValue)).toEqual(regexFails)
    expect(validator3.validate(runedValue)).toEqual(regexFailsCaseInsensitive)
  })
  it('Required validator works with custom error message', async () => {
    const errorMessage = 'This is a custom error message'
    const validator1: ValidatorStore = createFieldValidator([regexValidator({
      errorMessage,
      pattern :'[a-z]+'
    })])

    const regexFails: IsValid = {
      message: '${This is a custom error message}(en_GB)',
      error: 'VALUE_DOES_NOT_MATCH_PATTERN',
      valid: false
    }
    expect(validator1.validate()).toEqual(regexFails)
  })
})