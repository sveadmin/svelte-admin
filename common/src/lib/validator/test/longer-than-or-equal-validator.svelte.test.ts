import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  createFieldValidator,
} from '../index.js'

import {
  longerThanOrEqualValidator,
} from '../rules/index.js'

import type {
  ComparisonValidatorData,
  IsValid,
  ValidatorStore,
} from '../types.js'


describe('Test longer than or equal validators', () => {
  it('Longer than or equal validator works', async () => {
    const validator1: ValidatorStore = createFieldValidator([longerThanOrEqualValidator({base: 6, isValidatedValueAdded: true})])

    const longerThanOrEqualFails: IsValid = {
      message: 'Please enter a value longer than or exactly 6 characters long!',
      error: 'VALUE_IS_NOT_LONG_ENOUGH_ALLOWING_EQUAL',
      valid: false
    }

    expect(validator1.validate('1234567')).toEqual({valid: true, validatedValue: [{'longer-than-or-equal[6]': '1234567'}]})
    expect(validator1.validate(1234567)).toEqual({valid: true, validatedValue: [{'longer-than-or-equal[6]': '1234567'}]})
    expect(validator1.validate('123456')).toEqual({valid: true, validatedValue: [{'longer-than-or-equal[6]': '123456'}]})
    expect(validator1.validate('12345')).toEqual(longerThanOrEqualFails)
    expect(validator1.validate(new Date('2020-03-01'))).toEqual({valid: true, validatedValue: [{'longer-than-or-equal[6]': '2020-03-01T00:00:00.000Z'}]})
  })

  it('Longer than or equal validator date can not be used as base', async () => {
    const validator1: ValidatorStore = createFieldValidator([longerThanOrEqualValidator({base: new Date('2020-03-01'), isValidatedValueAdded: true})])

    const equalLengthDateFails: IsValid = {
      message: 'Date received for length comparison, send number instead!',
      error: 'DATE_LENGTH_CAN_NOT_BE_COMPARED',
      valid: false
    }

    expect(validator1.validate('123456')).toEqual(equalLengthDateFails)
  })

  it('Longer than or equal validator works with runes', async () => {
    let data : string = $state('12345')
    let boundary : number = $state(5)
    let boundaryString : string = $state('abcde')
    let boundaryStringLength : number = $derived(boundaryString.length)
    let param : ComparisonValidatorData = {base: 5, get valueFallback () { return data }}
    let param2 : ComparisonValidatorData = {base: () => boundary, valueFallback: () => data }
    let param3 : ComparisonValidatorData = {get base () { return boundaryStringLength }, get valueFallback () { return data } }

    const validator1: ValidatorStore = createFieldValidator([longerThanOrEqualValidator(param)])
    const validator2: ValidatorStore = createFieldValidator([longerThanOrEqualValidator(param2)])
    const validator3: ValidatorStore = createFieldValidator([longerThanOrEqualValidator(param3)])
    
    const longerThanOrEqualFails5: IsValid = {
      message: 'Please enter a value longer than or exactly 5 characters long!',
      error: 'VALUE_IS_NOT_LONG_ENOUGH_ALLOWING_EQUAL',
      valid: false
    }
    const longerThanOrEqualFails4: IsValid = {
      message: 'Please enter a value longer than or exactly 4 characters long!',
      error: 'VALUE_IS_NOT_LONG_ENOUGH_ALLOWING_EQUAL',
      valid: false
    }
    const longerThanOrEqualFails8: IsValid = {
      message: 'Please enter a value longer than or exactly 8 characters long!',
      error: 'VALUE_IS_NOT_LONG_ENOUGH_ALLOWING_EQUAL',
      valid: false
    }

    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'longer-than-or-equal[5]':'12345'}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'longer-than-or-equal[5]':'12345'}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'longer-than-or-equal[5]':'12345'}]})
    expect(validator1.validate({data: { valueFallback: '12345'}})).toEqual({valid: true, validatedValue: [{'longer-than-or-equal[5]':'12345'}]})
    expect(validator2.validate({data: { valueFallback: '12345'}})).toEqual({valid: true, validatedValue: [{'longer-than-or-equal[5]':'12345'}]})
    expect(validator3.validate({data: { valueFallback: '12345'}})).toEqual({valid: true, validatedValue: [{'longer-than-or-equal[5]':'12345'}]})

    boundary = 4
    boundaryString = 'abcd'
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'longer-than-or-equal[5]':'12345'}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'longer-than-or-equal[4]':'12345'}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'longer-than-or-equal[4]':'12345'}]})
    expect(validator1.validate({data: { valueFallback: '123456'}})).toEqual({valid: true, validatedValue: [{'longer-than-or-equal[5]':'123456'}]})
    expect(validator2.validate({data: { valueFallback: '123456'}})).toEqual({valid: true, validatedValue: [{'longer-than-or-equal[4]':'123456'}]})
    expect(validator3.validate({data: { valueFallback: '123456'}})).toEqual({valid: true, validatedValue: [{'longer-than-or-equal[4]':'123456'}]})

    data = '123456'
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'longer-than-or-equal[5]':'123456'}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'longer-than-or-equal[4]':'123456'}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'longer-than-or-equal[4]':'123456'}]})

    data = '1234'
    expect(validator1.validate()).toEqual(longerThanOrEqualFails5)
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'longer-than-or-equal[4]':'1234'}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'longer-than-or-equal[4]':'1234'}]})

    data = '12'
    expect(validator1.validate()).toEqual(longerThanOrEqualFails5)
    expect(validator2.validate()).toEqual(longerThanOrEqualFails4)
    expect(validator3.validate()).toEqual(longerThanOrEqualFails4)
    
    boundary = 8
    boundaryString = 'abcdefgh'
    expect(validator1.validate()).toEqual(longerThanOrEqualFails5)
    expect(validator2.validate()).toEqual(longerThanOrEqualFails8)
    expect(validator3.validate()).toEqual(longerThanOrEqualFails8)
    expect(validator1.validate({data: { valueFallback: '12345678'}})).toEqual({valid: true, validatedValue: [{'longer-than-or-equal[5]':'12345678'}]})
    expect(validator2.validate({data: { valueFallback: '12345678'}})).toEqual({valid: true, validatedValue: [{'longer-than-or-equal[8]': '12345678'}]})
    expect(validator3.validate({data: { valueFallback: '12345678'}})).toEqual({valid: true, validatedValue: [{'longer-than-or-equal[8]': '12345678'}]})
  })
  it('Longer than or equal validator works with custom error message', async () => {
    const errorMessage = 'This is a custom error message'
    const validator1: ValidatorStore = createFieldValidator([longerThanOrEqualValidator({
      base: 5,
      errorMessage  
    })])

    const longerThanOrEqualFails: IsValid = {
      message: 'This is a custom error message',
      error: 'VALUE_IS_NOT_LONG_ENOUGH_ALLOWING_EQUAL',
      valid: false
    }

    expect(validator1.validate(4)).toEqual(longerThanOrEqualFails)
  })
})