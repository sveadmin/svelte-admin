import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  createFieldValidator,
} from '../index.js'

import {
  shorterThanOrEqualValidator,
} from '../rules/index.js'

import type {
  ComparisonValidatorData,
  IsValid,
  ValidatorStore,
} from '../types.js'


describe('Test shorter than or equal validators', () => {
  it('Shorter than or equal validator works', async () => {
    const validator1: ValidatorStore = createFieldValidator([shorterThanOrEqualValidator({base: 6, isValidatedValueAdded: true})])

    const shorterThanOrEqualFails: IsValid = {
      message: 'Please enter a value shorter than or exactly 6 characters long!',
      error: 'VALUE_IS_NOT_SHORT_ENOUGH_ALLOWING_EQUAL',
      valid: false
    }

    expect(validator1.validate('12345')).toEqual({valid: true, validatedValue: [{'shorter-than-or-equal[6]': '12345'}]})
    expect(validator1.validate(12345)).toEqual({valid: true, validatedValue: [{'shorter-than-or-equal[6]': '12345'}]})
    expect(validator1.validate('123456')).toEqual({valid: true, validatedValue: [{'shorter-than-or-equal[6]': '123456'}]})
    expect(validator1.validate('1234567')).toEqual(shorterThanOrEqualFails)
    expect(validator1.validate(new Date('2020-03-01'))).toEqual(shorterThanOrEqualFails)
  })

  it('Shorter than or equal validator date can not be used as base', async () => {
    const validator1: ValidatorStore = createFieldValidator([shorterThanOrEqualValidator({base: new Date('2020-03-01'), isValidatedValueAdded: true})])

    const equalLengthDateFails: IsValid = {
      message: 'Date received for length comparison, send number instead!',
      error: 'DATE_LENGTH_CAN_NOT_BE_COMPARED',
      valid: false
    }

    expect(validator1.validate('123456')).toEqual(equalLengthDateFails)
  })

  it('Shorter than or equal validator works with runes', async () => {
    let data : string = $state('12345')
    let boundary : number = $state(5)
    let boundaryString : string = $state('abcde')
    let boundaryStringLength : number = $derived(boundaryString.length)
    let param : ComparisonValidatorData = {base: 5, get valueFallback () { return data }}
    let param2 : ComparisonValidatorData = {base: () => boundary, valueFallback: () => data }
    let param3 : ComparisonValidatorData = {get base () { return boundaryStringLength }, get valueFallback () { return data } }

    const validator1: ValidatorStore = createFieldValidator([shorterThanOrEqualValidator(param)])
    const validator2: ValidatorStore = createFieldValidator([shorterThanOrEqualValidator(param2)])
    const validator3: ValidatorStore = createFieldValidator([shorterThanOrEqualValidator(param3)])
    
    const shorterThanOrEqualFails5: IsValid = {
      message: 'Please enter a value shorter than or exactly 5 characters long!',
      error: 'VALUE_IS_NOT_SHORT_ENOUGH_ALLOWING_EQUAL',
      valid: false
    }
    const shorterThanOrEqualFails6: IsValid = {
      message: 'Please enter a value shorter than or exactly 6 characters long!',
      error: 'VALUE_IS_NOT_SHORT_ENOUGH_ALLOWING_EQUAL',
      valid: false
    }
    const shorterThanOrEqualFails8: IsValid = {
      message: 'Please enter a value shorter than or exactly 8 characters long!',
      error: 'VALUE_IS_NOT_SHORT_ENOUGH_ALLOWING_EQUAL',
      valid: false
    }

    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'shorter-than-or-equal[5]':'12345'}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'shorter-than-or-equal[5]':'12345'}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'shorter-than-or-equal[5]':'12345'}]})
    expect(validator1.validate({data: { valueFallback: '12345'}})).toEqual({valid: true, validatedValue: [{'shorter-than-or-equal[5]':'12345'}]})
    expect(validator2.validate({data: { valueFallback: '12345'}})).toEqual({valid: true, validatedValue: [{'shorter-than-or-equal[5]':'12345'}]})
    expect(validator3.validate({data: { valueFallback: '12345'}})).toEqual({valid: true, validatedValue: [{'shorter-than-or-equal[5]':'12345'}]})

    boundary = 6
    boundaryString = 'abcdef'
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'shorter-than-or-equal[5]':'12345'}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'shorter-than-or-equal[6]':'12345'}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'shorter-than-or-equal[6]':'12345'}]})
    expect(validator1.validate({data: { valueFallback: '123456'}})).toEqual(shorterThanOrEqualFails5)
    expect(validator2.validate({data: { valueFallback: '123456'}})).toEqual({valid: true, validatedValue: [{'shorter-than-or-equal[6]':'123456'}]})
    expect(validator3.validate({data: { valueFallback: '123456'}})).toEqual({valid: true, validatedValue: [{'shorter-than-or-equal[6]':'123456'}]})

    data = '123456'
    expect(validator1.validate()).toEqual(shorterThanOrEqualFails5)
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'shorter-than-or-equal[6]':'123456'}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'shorter-than-or-equal[6]':'123456'}]})

    data = '1234'
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'shorter-than-or-equal[5]':'1234'}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'shorter-than-or-equal[6]':'1234'}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'shorter-than-or-equal[6]':'1234'}]})

    data = '1212345678'
    expect(validator1.validate()).toEqual(shorterThanOrEqualFails5)
    expect(validator2.validate()).toEqual(shorterThanOrEqualFails6)
    expect(validator3.validate()).toEqual(shorterThanOrEqualFails6)
    
    boundary = 8
    boundaryString = 'abcdefgh'
    expect(validator1.validate()).toEqual(shorterThanOrEqualFails5)
    expect(validator2.validate()).toEqual(shorterThanOrEqualFails8)
    expect(validator3.validate()).toEqual(shorterThanOrEqualFails8)
    expect(validator1.validate({data: { valueFallback: '12345678'}})).toEqual(shorterThanOrEqualFails5)
    expect(validator2.validate({data: { valueFallback: '12345678'}})).toEqual({valid: true, validatedValue: [{'shorter-than-or-equal[8]': '12345678'}]})
    expect(validator3.validate({data: { valueFallback: '12345678'}})).toEqual({valid: true, validatedValue: [{'shorter-than-or-equal[8]': '12345678'}]})
  })
  it('Shorter than or equal validator works with custom error message', async () => {
    const errorMessage = 'This is a custom error message'
    const validator1: ValidatorStore = createFieldValidator([shorterThanOrEqualValidator({
      base: 5,
      errorMessage  
    })])

    const shorterThanOrEqualFails: IsValid = {
      message: 'This is a custom error message',
      error: 'VALUE_IS_NOT_SHORT_ENOUGH_ALLOWING_EQUAL',
      valid: false
    }

    expect(validator1.validate(123456)).toEqual(shorterThanOrEqualFails)
  })
})