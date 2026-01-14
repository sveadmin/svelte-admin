import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  createFieldValidator,
} from '../index.js'

import {
  equalLengthValidator,
} from '../rules/index.js'

import type {
  ComparisonValidatorData,
  IsValid,
  ValidatorStore,
} from '../types.js'


describe('Test equal length validators', () => {
  it('Equal length validator works', async () => {
    const validator1: ValidatorStore = createFieldValidator([equalLengthValidator({base: 6, isValidatedValueAdded: true})])

    const equalLengthFails: IsValid = {
      message: 'Please enter a value with a length of 6 characters!',
      error: 'VALUE_HAS_TO_MATCH_LENGTH',
      valid: false
    }

    expect(validator1.validate('123456')).toEqual({valid: true, validatedValue: [{'equal-length[6]': '123456'}]})
    expect(validator1.validate(123456)).toEqual({valid: true, validatedValue: [{'equal-length[6]': '123456'}]})
    expect(validator1.validate('12345')).toEqual(equalLengthFails)
    expect(validator1.validate('1234567')).toEqual(equalLengthFails)
    expect(validator1.validate(new Date('2020-03-01'))).toEqual(equalLengthFails)
  })

  it('Equal length validator date can not be used as base', async () => {
    const validator1: ValidatorStore = createFieldValidator([equalLengthValidator({base: new Date('2020-03-01'), isValidatedValueAdded: true})])

    const equalLengthDateFails: IsValid = {
      message: 'Date received for length comparison, send number instead!',
      error: 'DATE_LENGTH_CAN_NOT_BE_COMPARED',
      valid: false
    }

    expect(validator1.validate('123456')).toEqual(equalLengthDateFails)
  })

  it('Equal length validator works with runes', async () => {
    let data : string = $state('12345')
    let boundary : number = $state(5)
    let boundaryString : string = $state('abcde')
    let boundaryStringLength : number = $derived(boundaryString.length)
    let param : ComparisonValidatorData = {base: 5, get valueFallback () { return data }}
    let param2 : ComparisonValidatorData = {base: () => boundary, valueFallback: () => data }
    let param3 : ComparisonValidatorData = {get base () { return boundaryStringLength }, get valueFallback () { return data } }

    const validator1: ValidatorStore = createFieldValidator([equalLengthValidator(param)])
    const validator2: ValidatorStore = createFieldValidator([equalLengthValidator(param2)])
    const validator3: ValidatorStore = createFieldValidator([equalLengthValidator(param3)])
    
    const equalLengthFails5: IsValid = {
      message: 'Please enter a value with a length of 5 characters!',
      error: 'VALUE_HAS_TO_MATCH_LENGTH',
      valid: false
    }
    const equalLengthFails6: IsValid = {
      message: 'Please enter a value with a length of 6 characters!',
      error: 'VALUE_HAS_TO_MATCH_LENGTH',
      valid: false
    }
    const equalLengthFails8: IsValid = {
      message: 'Please enter a value with a length of 8 characters!',
      error: 'VALUE_HAS_TO_MATCH_LENGTH',
      valid: false
    }

    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'equal-length[5]':'12345'}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'equal-length[5]':'12345'}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'equal-length[5]':'12345'}]})
    expect(validator1.validate({data: { valueFallback: '12345'}})).toEqual({valid: true, validatedValue: [{'equal-length[5]':'12345'}]})
    expect(validator2.validate({data: { valueFallback: '12345'}})).toEqual({valid: true, validatedValue: [{'equal-length[5]':'12345'}]})
    expect(validator3.validate({data: { valueFallback: '12345'}})).toEqual({valid: true, validatedValue: [{'equal-length[5]':'12345'}]})

    boundary = 6
    boundaryString = 'abcdef'
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'equal-length[5]':'12345'}]})
    expect(validator2.validate()).toEqual(equalLengthFails6)
    expect(validator3.validate()).toEqual(equalLengthFails6)
    expect(validator1.validate({data: { valueFallback: '123456'}})).toEqual(equalLengthFails5)
    expect(validator2.validate({data: { valueFallback: '123456'}})).toEqual({valid: true, validatedValue: [{'equal-length[6]': '123456'}]})
    expect(validator3.validate({data: { valueFallback: '123456'}})).toEqual({valid: true, validatedValue: [{'equal-length[6]': '123456'}]})

    data = '123456'
    expect(validator1.validate()).toEqual(equalLengthFails5)
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'equal-length[6]': '123456'}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'equal-length[6]': '123456'}]})
    
    boundary = 8
    boundaryString = 'abcdefgh'
    expect(validator1.validate()).toEqual(equalLengthFails5)
    expect(validator2.validate()).toEqual(equalLengthFails8)
    expect(validator3.validate()).toEqual(equalLengthFails8)
    expect(validator1.validate({data: { valueFallback: '12345678'}})).toEqual(equalLengthFails5)
    expect(validator2.validate({data: { valueFallback: '12345678'}})).toEqual({valid: true, validatedValue: [{'equal-length[8]': '12345678'}]})
    expect(validator3.validate({data: { valueFallback: '12345678'}})).toEqual({valid: true, validatedValue: [{'equal-length[8]': '12345678'}]})
  })
  it('Equal length validator works with custom error message', async () => {
    const errorMessage = 'This is a custom error message'
    const validator1: ValidatorStore = createFieldValidator([equalLengthValidator({
      base: 5,
      errorMessage  
    })])

    const equalLengthFails: IsValid = {
      message: 'This is a custom error message',
      error: 'VALUE_HAS_TO_MATCH_LENGTH',
      valid: false
    }

    expect(validator1.validate(4)).toEqual(equalLengthFails)
  })
})