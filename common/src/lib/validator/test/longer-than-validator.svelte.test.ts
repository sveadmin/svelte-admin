import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  createFieldValidator,
} from '../index.js'

import {
  longerThanValidator,
} from '../rules/index.js'

import type {
  ComparisonValidatorData,
  IsValid,
  ValidatorStore,
} from '../types.js'


describe('Test longer than validators', () => {
  it('Longer than validator works', async () => {
    const validator1: ValidatorStore = createFieldValidator([longerThanValidator({base: 6, isValidatedValueAdded: true})])

    const longerThanFails: IsValid = {
      message: 'Please enter a value longer than 6 characters!',
      error: 'VALUE_IS_NOT_LONG_ENOUGH',
      valid: false
    }

    expect(validator1.validate('1234567')).toEqual({valid: true, validatedValue: [{'longer-than[6]': '1234567'}]})
    expect(validator1.validate(1234567)).toEqual({valid: true, validatedValue: [{'longer-than[6]': '1234567'}]})
    expect(validator1.validate('123456')).toEqual(longerThanFails)
    expect(validator1.validate('12345')).toEqual(longerThanFails)
    expect(validator1.validate(new Date('2020-03-01'))).toEqual({valid: true, validatedValue: [{'longer-than[6]': '2020-03-01T00:00:00.000Z'}]})
  })

  it('Longer than validator date can not be used as base', async () => {
    const validator1: ValidatorStore = createFieldValidator([longerThanValidator({base: new Date('2020-03-01'), isValidatedValueAdded: true})])

    const equalLengthDateFails: IsValid = {
      message: 'Date received for length comparison, send number instead!',
      error: 'DATE_LENGTH_CAN_NOT_BE_COMPARED',
      valid: false
    }

    expect(validator1.validate('123456')).toEqual(equalLengthDateFails)
  })

  it('Longer than validator works with runes', async () => {
    let data : string = $state('12345')
    let boundary : number = $state(5)
    let boundaryString : string = $state('abcde')
    let boundaryStringLength : number = $derived(boundaryString.length)
    let param : ComparisonValidatorData = {base: 5, get valueFallback () { return data }}
    let param2 : ComparisonValidatorData = {base: () => boundary, valueFallback: () => data }
    let param3 : ComparisonValidatorData = {get base () { return boundaryStringLength }, get valueFallback () { return data } }

    const validator1: ValidatorStore = createFieldValidator([longerThanValidator(param)])
    const validator2: ValidatorStore = createFieldValidator([longerThanValidator(param2)])
    const validator3: ValidatorStore = createFieldValidator([longerThanValidator(param3)])
    
    const longerThanFails5: IsValid = {
      message: 'Please enter a value longer than 5 characters!',
      error: 'VALUE_IS_NOT_LONG_ENOUGH',
      valid: false
    }
    const longerThanFails4: IsValid = {
      message: 'Please enter a value longer than 4 characters!',
      error: 'VALUE_IS_NOT_LONG_ENOUGH',
      valid: false
    }
    const longerThanFails8: IsValid = {
      message: 'Please enter a value longer than 8 characters!',
      error: 'VALUE_IS_NOT_LONG_ENOUGH',
      valid: false
    }

    expect(validator1.validate()).toEqual(longerThanFails5)
    expect(validator2.validate()).toEqual(longerThanFails5)
    expect(validator3.validate()).toEqual(longerThanFails5)
    expect(validator1.validate({data: { valueFallback: '12345'}})).toEqual(longerThanFails5)
    expect(validator2.validate({data: { valueFallback: '12345'}})).toEqual(longerThanFails5)
    expect(validator3.validate({data: { valueFallback: '12345'}})).toEqual(longerThanFails5)

    boundary = 4
    boundaryString = 'abcd'
    expect(validator1.validate()).toEqual(longerThanFails5)
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'longer-than[4]':'12345'}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'longer-than[4]':'12345'}]})
    expect(validator1.validate({data: { valueFallback: '123456'}})).toEqual({valid: true, validatedValue: [{'longer-than[5]':'123456'}]})
    expect(validator2.validate({data: { valueFallback: '123456'}})).toEqual({valid: true, validatedValue: [{'longer-than[4]':'123456'}]})
    expect(validator3.validate({data: { valueFallback: '123456'}})).toEqual({valid: true, validatedValue: [{'longer-than[4]':'123456'}]})

    data = '123456'
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'longer-than[5]':'123456'}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'longer-than[4]':'123456'}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'longer-than[4]':'123456'}]})

    data = '1234'
    expect(validator1.validate()).toEqual(longerThanFails5)
    expect(validator2.validate()).toEqual(longerThanFails4)
    expect(validator3.validate()).toEqual(longerThanFails4)

    data = '12'
    expect(validator1.validate()).toEqual(longerThanFails5)
    expect(validator2.validate()).toEqual(longerThanFails4)
    expect(validator3.validate()).toEqual(longerThanFails4)
    
    boundary = 8
    boundaryString = 'abcdefgh'
    expect(validator1.validate()).toEqual(longerThanFails5)
    expect(validator2.validate()).toEqual(longerThanFails8)
    expect(validator3.validate()).toEqual(longerThanFails8)
    expect(validator1.validate({data: { valueFallback: '12345678'}})).toEqual({valid: true, validatedValue: [{'longer-than[5]':'12345678'}]})
    expect(validator2.validate({data: { valueFallback: '12345678'}})).toEqual(longerThanFails8)
    expect(validator3.validate({data: { valueFallback: '12345678'}})).toEqual(longerThanFails8)
  })
  it('Longer than validator works with custom error message', async () => {
    const errorMessage = 'This is a custom error message'
    const validator1: ValidatorStore = createFieldValidator([longerThanValidator({
      base: 5,
      errorMessage  
    })])

    const longerThanFails: IsValid = {
      message: 'This is a custom error message',
      error: 'VALUE_IS_NOT_LONG_ENOUGH',
      valid: false
    }

    expect(validator1.validate(4)).toEqual(longerThanFails)
  })
})