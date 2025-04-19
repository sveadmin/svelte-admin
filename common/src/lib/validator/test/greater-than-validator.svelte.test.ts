import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  createFieldValidator,
} from '../index.js'

import {
  greaterThanValidator,
} from '../rules/index.js'

import type {
  ComparisonValidatorData,
  IsValid,
  ValidatorStore,
  ValueFallback,
} from '../types.js'


describe('Test greater than validators', () => {
  it('Greater than validator works', async () => {
    const validator1: ValidatorStore = createFieldValidator([greaterThanValidator({base: 5})])
    const validator2: ValidatorStore = createFieldValidator([greaterThanValidator({base: () => 5})])

    const greaterThanFails: IsValid = {
      message: 'Please select a value greater than 5!',
      error: 'VALUE_IS_NOT_BIG_ENOUGH',
      valid: false
    }

    expect(validator1.validate(6)).toEqual({valid: true, validatedValue: [6]})
    expect(validator2.validate(6)).toEqual({valid: true, validatedValue: [6]})
    expect(validator1.validate({value: 6})).toEqual({valid: true, validatedValue: [6]})
    expect(validator2.validate({value: 6})).toEqual({valid: true, validatedValue: [6]})
    expect(validator1.validate(5)).toEqual(greaterThanFails)
    expect(validator2.validate(5)).toEqual(greaterThanFails)
    expect(validator1.validate({value: 5})).toEqual(greaterThanFails)
    expect(validator2.validate({value: 5})).toEqual(greaterThanFails)
    expect(validator1.validate(4)).toEqual(greaterThanFails)
    expect(validator2.validate(4)).toEqual(greaterThanFails)
    expect(validator1.validate({value: 4})).toEqual(greaterThanFails)
    expect(validator2.validate({value: 4})).toEqual(greaterThanFails)

  })
  it('Greater than validator works with injected stores', async () => {
    let data : number = $state(6)
    let boundary : number = $state(5)
    let param : ComparisonValidatorData = {base: 5, get valueFallback () { return data }}
    let param2 : ComparisonValidatorData = {base: () => boundary, valueFallback: () => data }
    let param3 : ComparisonValidatorData = {get base () { return boundary }, get valueFallback () { return data } }

    const validator1: ValidatorStore = createFieldValidator([greaterThanValidator(param)])
    const validator2: ValidatorStore = createFieldValidator([greaterThanValidator(param2)])
    const validator3: ValidatorStore = createFieldValidator([greaterThanValidator(param3)])

    const greaterThanFails: IsValid = {
      message: 'Please select a value greater than 5!',
      error: 'VALUE_IS_NOT_BIG_ENOUGH',
      valid: false
    }
    const greaterThanFails6: IsValid = {
      message: 'Please select a value greater than 6!',
      error: 'VALUE_IS_NOT_BIG_ENOUGH',
      valid: false
    }
    const greaterThanFails8: IsValid = {
      message: 'Please select a value greater than 8!',
      error: 'VALUE_IS_NOT_BIG_ENOUGH',
      valid: false
    }
    const greaterThanFails9: IsValid = {
      message: 'Please select a value greater than 9!',
      error: 'VALUE_IS_NOT_BIG_ENOUGH',
      valid: false
    }

    expect(validator1.validate()).toEqual({valid: true, validatedValue: [6]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [6]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [6]})
    expect(validator1.validate({data: { valueFallback: 7}})).toEqual({valid: true, validatedValue: [7]})
    expect(validator2.validate({data: { valueFallback: 7}})).toEqual({valid: true, validatedValue: [7]})
    expect(validator3.validate({data: { valueFallback: 7}})).toEqual({valid: true, validatedValue: [7]})

    boundary = 6
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [6]})
    expect(validator2.validate()).toEqual(greaterThanFails6)
    expect(validator3.validate()).toEqual(greaterThanFails6)
    expect(validator1.validate({data: { valueFallback: 7}})).toEqual({valid: true, validatedValue: [7]})
    expect(validator2.validate({data: { valueFallback: 7}})).toEqual({valid: true, validatedValue: [7]})
    expect(validator3.validate({data: { valueFallback: 7}})).toEqual({valid: true, validatedValue: [7]})

    data = 8
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [8]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [8]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [8]})
    
    boundary = 8
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [8]})
    expect(validator2.validate()).toEqual(greaterThanFails8)
    expect(validator3.validate()).toEqual(greaterThanFails8)
    expect(validator1.validate({data: { valueFallback: 8}})).toEqual({valid: true, validatedValue: [8]})
    expect(validator2.validate({data: { valueFallback: 8}})).toEqual(greaterThanFails8)
    expect(validator3.validate({data: { valueFallback: 8}})).toEqual(greaterThanFails8)

    boundary = 9
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [8]})
    expect(validator2.validate()).toEqual(greaterThanFails9)
    expect(validator3.validate()).toEqual(greaterThanFails9)
    expect(validator1.validate({data: { valueFallback: 8}})).toEqual({valid: true, validatedValue: [8]})
    expect(validator2.validate({data: { valueFallback: 8}})).toEqual(greaterThanFails9)
    expect(validator3.validate({data: { valueFallback: 8}})).toEqual(greaterThanFails9)

  })

  it('Greater than validator works for dates', async () => {
    let data : string = $state("2020-03-02")
    let dataDate : Date = $state(new Date('2020-03-02'))
    let boundary : Date = $state(new Date('2020-03-01'))
    let param : ComparisonValidatorData = {base: new Date('2020-03-01'), get valueFallback () { return data }}
    let param2 : ComparisonValidatorData = {base: () => boundary, valueFallback: () => data }
    let param3 : ComparisonValidatorData = {get base () { return boundary }, get valueFallback () { return data } }
    let param4 : ComparisonValidatorData = {base: new Date('2020-03-01'), get valueFallback () { return dataDate }}
    let param5 : ComparisonValidatorData = {base: () => boundary, valueFallback: () => dataDate }
    let param6 : ComparisonValidatorData = {get base () { return boundary }, get valueFallback () { return dataDate } }
  
    const validator1: ValidatorStore = createFieldValidator([greaterThanValidator(param)])
    const validator2: ValidatorStore = createFieldValidator([greaterThanValidator(param2)])
    const validator3: ValidatorStore = createFieldValidator([greaterThanValidator(param3)])
    const validator4: ValidatorStore = createFieldValidator([greaterThanValidator(param4)])
    const validator5: ValidatorStore = createFieldValidator([greaterThanValidator(param5)])
    const validator6: ValidatorStore = createFieldValidator([greaterThanValidator(param6)])

    const greaterThanFailsForDate: IsValid = {
      message: 'Please select a value greater than 2020-03-01T00:00:00.000Z!',
      error: 'VALUE_IS_NOT_BIG_ENOUGH',
      valid: false
    }

    expect(validator1.validate()).toEqual({valid: true, validatedValue: [new Date('2020-03-02')]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [new Date('2020-03-02')]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [new Date('2020-03-02')]})
    expect(validator4.validate()).toEqual({valid: true, validatedValue: [new Date('2020-03-02')]})
    expect(validator5.validate()).toEqual({valid: true, validatedValue: [new Date('2020-03-02')]})
    expect(validator6.validate()).toEqual({valid: true, validatedValue: [new Date('2020-03-02')]})

    expect(validator1.validate({data: {valueFallback: '2020-03-03'}})).toEqual({valid: true, validatedValue: [new Date('2020-03-03')]})
    expect(validator2.validate({data: {valueFallback: '2020-03-03'}})).toEqual({valid: true, validatedValue: [new Date('2020-03-03')]})
    expect(validator3.validate({data: {valueFallback: '2020-03-03'}})).toEqual({valid: true, validatedValue: [new Date('2020-03-03')]})
    expect(validator4.validate({data: {valueFallback: '2020-03-03'}})).toEqual({valid: true, validatedValue: [new Date('2020-03-03')]})
    expect(validator5.validate({data: {valueFallback: '2020-03-03'}})).toEqual({valid: true, validatedValue: [new Date('2020-03-03')]})
    expect(validator6.validate({data: {valueFallback: '2020-03-03'}})).toEqual({valid: true, validatedValue: [new Date('2020-03-03')]})

    expect(validator1.validate({data: {valueFallback: new Date('2020-03-03')}})).toEqual({valid: true, validatedValue: [new Date('2020-03-03')]})
    expect(validator2.validate({data: {valueFallback: new Date('2020-03-03')}})).toEqual({valid: true, validatedValue: [new Date('2020-03-03')]})
    expect(validator3.validate({data: {valueFallback: new Date('2020-03-03')}})).toEqual({valid: true, validatedValue: [new Date('2020-03-03')]})
    expect(validator4.validate({data: {valueFallback: new Date('2020-03-03')}})).toEqual({valid: true, validatedValue: [new Date('2020-03-03')]})
    expect(validator5.validate({data: {valueFallback: new Date('2020-03-03')}})).toEqual({valid: true, validatedValue: [new Date('2020-03-03')]})
    expect(validator6.validate({data: {valueFallback: new Date('2020-03-03')}})).toEqual({valid: true, validatedValue: [new Date('2020-03-03')]})

    data = '2020-03-01T00:00:01-09:00'
    dataDate = new Date('2020-03-01T00:00:01-09:00')
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:01-09:00')]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:01-09:00')]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:01-09:00')]})
    expect(validator4.validate()).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:01-09:00')]})
    expect(validator5.validate()).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:01-09:00')]})
    expect(validator6.validate()).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:01-09:00')]})

    expect(validator1.validate({data: {valueFallback: '2020-03-01T00:00:02-09:00'}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02-09:00')]})
    expect(validator2.validate({data: {valueFallback: '2020-03-01T00:00:02-09:00'}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02-09:00')]})
    expect(validator3.validate({data: {valueFallback: '2020-03-01T00:00:02-09:00'}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02-09:00')]})
    expect(validator4.validate({data: {valueFallback: '2020-03-01T00:00:02-09:00'}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02-09:00')]})
    expect(validator5.validate({data: {valueFallback: '2020-03-01T00:00:02-09:00'}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02-09:00')]})
    expect(validator6.validate({data: {valueFallback: '2020-03-01T00:00:02-09:00'}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02-09:00')]})

    expect(validator1.validate({data: {valueFallback: new Date('2020-03-01T00:00:02-09:00')}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02-09:00')]})
    expect(validator2.validate({data: {valueFallback: new Date('2020-03-01T00:00:02-09:00')}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02-09:00')]})
    expect(validator3.validate({data: {valueFallback: new Date('2020-03-01T00:00:02-09:00')}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02-09:00')]})
    expect(validator4.validate({data: {valueFallback: new Date('2020-03-01T00:00:02-09:00')}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02-09:00')]})
    expect(validator5.validate({data: {valueFallback: new Date('2020-03-01T00:00:02-09:00')}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02-09:00')]})
    expect(validator6.validate({data: {valueFallback: new Date('2020-03-01T00:00:02-09:00')}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02-09:00')]})

    data = '2020-03-01T00:00:01Z'
    dataDate = new Date('2020-03-01T00:00:01Z')
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:01Z')]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:01Z')]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:01Z')]})
    expect(validator4.validate()).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:01Z')]})
    expect(validator5.validate()).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:01Z')]})
    expect(validator6.validate()).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:01Z')]})

    expect(validator1.validate({data: {valueFallback: '2020-03-01T00:00:02Z'}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02Z')]})
    expect(validator2.validate({data: {valueFallback: '2020-03-01T00:00:02Z'}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02Z')]})
    expect(validator3.validate({data: {valueFallback: '2020-03-01T00:00:02Z'}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02Z')]})
    expect(validator4.validate({data: {valueFallback: '2020-03-01T00:00:02Z'}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02Z')]})
    expect(validator5.validate({data: {valueFallback: '2020-03-01T00:00:02Z'}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02Z')]})
    expect(validator6.validate({data: {valueFallback: '2020-03-01T00:00:02Z'}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02Z')]})

    expect(validator1.validate({data: {valueFallback: new Date('2020-03-01T00:00:02Z')}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02Z')]})
    expect(validator2.validate({data: {valueFallback: new Date('2020-03-01T00:00:02Z')}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02Z')]})
    expect(validator3.validate({data: {valueFallback: new Date('2020-03-01T00:00:02Z')}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02Z')]})
    expect(validator4.validate({data: {valueFallback: new Date('2020-03-01T00:00:02Z')}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02Z')]})
    expect(validator5.validate({data: {valueFallback: new Date('2020-03-01T00:00:02Z')}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02Z')]})
    expect(validator6.validate({data: {valueFallback: new Date('2020-03-01T00:00:02Z')}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02Z')]})

    data = '2020-02-31'
    dataDate = new Date('2020-02-31')
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [new Date('2020-03-02')]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [new Date('2020-03-02')]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [new Date('2020-03-02')]})
    expect(validator4.validate()).toEqual({valid: true, validatedValue: [new Date('2020-03-02')]})
    expect(validator5.validate()).toEqual({valid: true, validatedValue: [new Date('2020-03-02')]})
    expect(validator6.validate()).toEqual({valid: true, validatedValue: [new Date('2020-03-02')]})

    expect(validator1.validate({data: {valueFallback: '2020-02-31'}})).toEqual({valid: true, validatedValue: [new Date('2020-03-02')]})
    expect(validator2.validate({data: {valueFallback: '2020-02-31'}})).toEqual({valid: true, validatedValue: [new Date('2020-03-02')]})
    expect(validator3.validate({data: {valueFallback: '2020-02-31'}})).toEqual({valid: true, validatedValue: [new Date('2020-03-02')]})
    expect(validator4.validate({data: {valueFallback: '2020-02-31'}})).toEqual({valid: true, validatedValue: [new Date('2020-03-02')]})
    expect(validator5.validate({data: {valueFallback: '2020-02-31'}})).toEqual({valid: true, validatedValue: [new Date('2020-03-02')]})
    expect(validator6.validate({data: {valueFallback: '2020-02-31'}})).toEqual({valid: true, validatedValue: [new Date('2020-03-02')]})

    expect(validator1.validate({data: {valueFallback: new Date('2020-02-31')}})).toEqual({valid: true, validatedValue: [new Date('2020-03-02')]})
    expect(validator2.validate({data: {valueFallback: new Date('2020-02-31')}})).toEqual({valid: true, validatedValue: [new Date('2020-03-02')]})
    expect(validator3.validate({data: {valueFallback: new Date('2020-02-31')}})).toEqual({valid: true, validatedValue: [new Date('2020-03-02')]})
    expect(validator4.validate({data: {valueFallback: new Date('2020-02-31')}})).toEqual({valid: true, validatedValue: [new Date('2020-03-02')]})
    expect(validator5.validate({data: {valueFallback: new Date('2020-02-31')}})).toEqual({valid: true, validatedValue: [new Date('2020-03-02')]})
    expect(validator6.validate({data: {valueFallback: new Date('2020-02-31')}})).toEqual({valid: true, validatedValue: [new Date('2020-03-02')]})

    expect(validator3.validate('2020-03-01')).toEqual(greaterThanFailsForDate)
    expect(validator3.validate(new Date('2020-03-01'))).toEqual(greaterThanFailsForDate)
    expect(validator3.validate({value: '2020-03-01'})).toEqual(greaterThanFailsForDate)
    expect(validator3.validate({value: new Date('2020-03-01')})).toEqual(greaterThanFailsForDate)
    expect(validator4.validate('2020-03-01')).toEqual(greaterThanFailsForDate)
    expect(validator4.validate(new Date('2020-03-01'))).toEqual(greaterThanFailsForDate)
    expect(validator4.validate({value: '2020-03-01'})).toEqual(greaterThanFailsForDate)
    expect(validator4.validate({value: new Date('2020-03-01')})).toEqual(greaterThanFailsForDate)
    expect(validator3.validate('2020-03-01T00:00:00Z')).toEqual(greaterThanFailsForDate)
    expect(validator3.validate(new Date('2020-03-01T00:00:00Z'))).toEqual(greaterThanFailsForDate)
    expect(validator3.validate({value: '2020-03-01T00:00:00Z'})).toEqual(greaterThanFailsForDate)
    expect(validator3.validate({value: new Date('2020-03-01T00:00:00Z')})).toEqual(greaterThanFailsForDate)
    expect(validator4.validate('2020-03-01T00:00:00Z')).toEqual(greaterThanFailsForDate)
    expect(validator4.validate(new Date('2020-03-01T00:00:00Z'))).toEqual(greaterThanFailsForDate)
    expect(validator4.validate({value: '2020-03-01T00:00:00Z'})).toEqual(greaterThanFailsForDate)
    expect(validator4.validate({value: new Date('2020-03-01T00:00:00Z')})).toEqual(greaterThanFailsForDate)

    expect(validator3.validate('2020-03-01T00:00:01+09:00')).toEqual(greaterThanFailsForDate)
    expect(validator3.validate(new Date('2020-03-01T00:00:01+09:00'))).toEqual(greaterThanFailsForDate)
    expect(validator3.validate({value: '2020-03-01T00:00:01+09:00'})).toEqual(greaterThanFailsForDate)
    expect(validator3.validate({value: new Date('2020-03-01T00:00:01+09:00')})).toEqual(greaterThanFailsForDate)
    expect(validator4.validate('2020-03-01T00:00:01+09:00')).toEqual(greaterThanFailsForDate)
    expect(validator4.validate(new Date('2020-03-01T00:00:01+09:00'))).toEqual(greaterThanFailsForDate)
    expect(validator4.validate({value: '2020-03-01T00:00:01+09:00'})).toEqual(greaterThanFailsForDate)
    expect(validator4.validate({value: new Date('2020-03-01T00:00:01+09:00')})).toEqual(greaterThanFailsForDate)

    expect(validator3.validate('2020-02-29')).toEqual(greaterThanFailsForDate)
    expect(validator3.validate(new Date('2020-02-29'))).toEqual(greaterThanFailsForDate)
    expect(validator3.validate({value: '2020-02-29'})).toEqual(greaterThanFailsForDate)
    expect(validator3.validate({value: new Date('2020-02-29')})).toEqual(greaterThanFailsForDate)
    expect(validator4.validate('2020-02-29')).toEqual(greaterThanFailsForDate)
    expect(validator4.validate(new Date('2020-02-29'))).toEqual(greaterThanFailsForDate)
    expect(validator4.validate({value: '2020-02-29'})).toEqual(greaterThanFailsForDate)
    expect(validator4.validate({value: new Date('2020-02-29')})).toEqual(greaterThanFailsForDate)
  })
})