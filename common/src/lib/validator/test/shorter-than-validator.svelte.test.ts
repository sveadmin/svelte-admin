import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  createFieldValidator,
} from '../index.js'

import {
  shorterThanValidator,
} from '../rules/index.js'

import type {
  ComparisonValidatorData,
  IsValid,
  ValidatorStore,
} from '../types.js'


describe('Test shorter than validators', () => {
  it('Shorter than validator works', async () => {
    const validator1: ValidatorStore = createFieldValidator([shorterThanValidator({base: 6, isValidatedValueAdded: true})])

    const shorterThanFails: IsValid = {
      message: 'Please enter a value shorter than 6 characters!',
      error: 'VALUE_IS_NOT_SHORT_ENOUGH',
      valid: false
    }

    expect(validator1.validate('12345')).toEqual({valid: true, validatedValue: [{'shorter-than[6]': '12345'}]})
    expect(validator1.validate(12345)).toEqual({valid: true, validatedValue: [{'shorter-than[6]': '12345'}]})
    expect(validator1.validate('123456')).toEqual(shorterThanFails)
    expect(validator1.validate('1234567')).toEqual(shorterThanFails)
    expect(validator1.validate(new Date('2020-03-01'))).toEqual(shorterThanFails)
  })

  it('Shorter than validator date can not be used as base', async () => {
    const validator1: ValidatorStore = createFieldValidator([shorterThanValidator({base: new Date('2020-03-01'), isValidatedValueAdded: true})])

    const equalLengthDateFails: IsValid = {
      message: 'Date received for length comparison, send number instead!',
      error: 'DATE_LENGTH_CAN_NOT_BE_COMPARED',
      valid: false
    }

    expect(validator1.validate('123456')).toEqual(equalLengthDateFails)
  })

  it('Shorter than validator works with runes', async () => {
    let data : string = $state('12345')
    let boundary : number = $state(5)
    let boundaryString : string = $state('abcde')
    let boundaryStringLength : number = $derived(boundaryString.length)
    let param : ComparisonValidatorData = {base: 5, get valueFallback () { return data }}
    let param2 : ComparisonValidatorData = {base: () => boundary, valueFallback: () => data }
    let param3 : ComparisonValidatorData = {get base () { return boundaryStringLength }, get valueFallback () { return data } }

    const validator1: ValidatorStore = createFieldValidator([shorterThanValidator(param)])
    const validator2: ValidatorStore = createFieldValidator([shorterThanValidator(param2)])
    const validator3: ValidatorStore = createFieldValidator([shorterThanValidator(param3)])
    
    const shorterThanFails5: IsValid = {
      message: 'Please enter a value shorter than 5 characters!',
      error: 'VALUE_IS_NOT_SHORT_ENOUGH',
      valid: false
    }
    const shorterThanFails6: IsValid = {
      message: 'Please enter a value shorter than 6 characters!',
      error: 'VALUE_IS_NOT_SHORT_ENOUGH',
      valid: false
    }
    const shorterThanFails8: IsValid = {
      message: 'Please enter a value shorter than 8 characters!',
      error: 'VALUE_IS_NOT_SHORT_ENOUGH',
      valid: false
    }

    expect(validator1.validate()).toEqual(shorterThanFails5)
    expect(validator2.validate()).toEqual(shorterThanFails5)
    expect(validator3.validate()).toEqual(shorterThanFails5)
    expect(validator1.validate({data: { valueFallback: '12345'}})).toEqual(shorterThanFails5)
    expect(validator2.validate({data: { valueFallback: '12345'}})).toEqual(shorterThanFails5)
    expect(validator3.validate({data: { valueFallback: '12345'}})).toEqual(shorterThanFails5)

    boundary = 6
    boundaryString = 'abcdef'
    expect(validator1.validate()).toEqual(shorterThanFails5)
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'shorter-than[6]':'12345'}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'shorter-than[6]':'12345'}]})
    expect(validator1.validate({data: { valueFallback: '123456'}})).toEqual(shorterThanFails5)
    expect(validator2.validate({data: { valueFallback: '123456'}})).toEqual(shorterThanFails6)
    expect(validator3.validate({data: { valueFallback: '123456'}})).toEqual(shorterThanFails6)

    data = '123456'
    expect(validator1.validate()).toEqual(shorterThanFails5)
    expect(validator2.validate()).toEqual(shorterThanFails6)
    expect(validator3.validate()).toEqual(shorterThanFails6)

    data = '1234'
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'shorter-than[5]':'1234'}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'shorter-than[6]':'1234'}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'shorter-than[6]':'1234'}]})

    data = '1212345678'
    expect(validator1.validate()).toEqual(shorterThanFails5)
    expect(validator2.validate()).toEqual(shorterThanFails6)
    expect(validator3.validate()).toEqual(shorterThanFails6)
    
    boundary = 8
    boundaryString = 'abcdefgh'
    expect(validator1.validate()).toEqual(shorterThanFails5)
    expect(validator2.validate()).toEqual(shorterThanFails8)
    expect(validator3.validate()).toEqual(shorterThanFails8)
    expect(validator1.validate({data: { valueFallback: '12345678'}})).toEqual(shorterThanFails5)
    expect(validator2.validate({data: { valueFallback: '12345678'}})).toEqual(shorterThanFails8)
    expect(validator3.validate({data: { valueFallback: '12345678'}})).toEqual(shorterThanFails8)
  })
  it('Shorter than validator works with custom error message', async () => {
    const errorMessage = 'This is a custom error message'
    const validator1: ValidatorStore = createFieldValidator([shorterThanValidator({
      base: 5,
      errorMessage  
    })])

    const shorterThanFails: IsValid = {
      message: 'This is a custom error message',
      error: 'VALUE_IS_NOT_SHORT_ENOUGH',
      valid: false
    }

    expect(validator1.validate(123456)).toEqual(shorterThanFails)
  })
})