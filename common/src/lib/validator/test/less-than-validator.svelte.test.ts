import {
  describe,
  expect,
  it,
  vi,
} from 'vitest'

import {
  createFieldValidator,
} from '../index.js'

import {
  lessThanValidator,
} from '../rules/index.js'

import type {
  ComparisonValidatorData,
  IsValid,
  ValidatorStore,
  ValueFallback,
} from '../types.js'

vi.stubEnv('TZ', 'Europe/Berlin');

describe('Test less than validators', () => {
  it('Less than validator works', async () => {
    const validator1: ValidatorStore = createFieldValidator([lessThanValidator({base: 5})])
    const validator2: ValidatorStore = createFieldValidator([lessThanValidator({base: () => 5})])

    const lessThanFails: IsValid = {
      message: 'Please select a value less than 5!',
      error: 'VALUE_IS_NOT_SMALL_ENOUGH',
      valid: false
    }

    expect(validator1.validate(6)).toEqual(lessThanFails)
    expect(validator2.validate(6)).toEqual(lessThanFails)
    expect(validator1.validate({value: 6})).toEqual(lessThanFails)
    expect(validator2.validate({value: 6})).toEqual(lessThanFails)
    expect(validator1.validate(5)).toEqual(lessThanFails)
    expect(validator2.validate(5)).toEqual(lessThanFails)
    expect(validator1.validate({value: 5})).toEqual(lessThanFails)
    expect(validator2.validate({value: 5})).toEqual(lessThanFails)
    expect(validator1.validate(4)).toEqual({valid: true, validatedValue: [4]})
    expect(validator2.validate(4)).toEqual({valid: true, validatedValue: [4]})
    expect(validator1.validate({value: 4})).toEqual({valid: true, validatedValue: [4]})
    expect(validator2.validate({value: 4})).toEqual({valid: true, validatedValue: [4]})

  })
  it('Less than validator works with runes', async () => {
    let data : number = $state(4)
    let boundary : number = $state(5)
    let param : ComparisonValidatorData = {base: 5, get valueFallback () { return data }}
    let param2 : ComparisonValidatorData = {base: () => boundary, valueFallback: () => data }
    let param3 : ComparisonValidatorData = {get base () { return boundary }, get valueFallback () { return data } }

    const validator1: ValidatorStore = createFieldValidator([lessThanValidator(param)])
    const validator2: ValidatorStore = createFieldValidator([lessThanValidator(param2)])
    const validator3: ValidatorStore = createFieldValidator([lessThanValidator(param3)])

    const lessThanFails4: IsValid = {
      message: 'Please select a value less than 4!',
      error: 'VALUE_IS_NOT_SMALL_ENOUGH',
      valid: false
    }
    const lessThanFails2: IsValid = {
      message: 'Please select a value less than 2!',
      error: 'VALUE_IS_NOT_SMALL_ENOUGH',
      valid: false
    }
    const lessThanFails1: IsValid = {
      message: 'Please select a value less than 1!',
      error: 'VALUE_IS_NOT_SMALL_ENOUGH',
      valid: false
    }

    expect(validator1.validate()).toEqual({valid: true, validatedValue: [4]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [4]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [4]})
    expect(validator1.validate({data: { valueFallback: 3}})).toEqual({valid: true, validatedValue: [3]})
    expect(validator2.validate({data: { valueFallback: 3}})).toEqual({valid: true, validatedValue: [3]})
    expect(validator3.validate({data: { valueFallback: 3}})).toEqual({valid: true, validatedValue: [3]})

    boundary = 4
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [4]})
    expect(validator2.validate()).toEqual(lessThanFails4)
    expect(validator3.validate()).toEqual(lessThanFails4)
    expect(validator1.validate({data: { valueFallback: 3}})).toEqual({valid: true, validatedValue: [3]})
    expect(validator2.validate({data: { valueFallback: 3}})).toEqual({valid: true, validatedValue: [3]})
    expect(validator3.validate({data: { valueFallback: 3}})).toEqual({valid: true, validatedValue: [3]})

    data = 2
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [2]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [2]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [2]})
    
    boundary = 2
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [2]})
    expect(validator2.validate()).toEqual(lessThanFails2)
    expect(validator3.validate()).toEqual(lessThanFails2)
    expect(validator1.validate({data: { valueFallback: 2}})).toEqual({valid: true, validatedValue: [2]})
    expect(validator2.validate({data: { valueFallback: 2}})).toEqual(lessThanFails2)
    expect(validator3.validate({data: { valueFallback: 2}})).toEqual(lessThanFails2)

    boundary = 1
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [2]})
    expect(validator2.validate()).toEqual(lessThanFails1)
    expect(validator3.validate()).toEqual(lessThanFails1)
    expect(validator1.validate({data: { valueFallback: 2}})).toEqual({valid: true, validatedValue: [2]})
    expect(validator2.validate({data: { valueFallback: 2}})).toEqual(lessThanFails1)
    expect(validator3.validate({data: { valueFallback: 2}})).toEqual(lessThanFails1)

  })

  it('Less than validator works for dates', async () => {
    let data : string = $state('2020-02-29')
    let dataDate : Date = $state(new Date('2020-02-29'))
    let boundary : Date = $state(new Date('2020-03-01'))
    let param : ComparisonValidatorData = {base: new Date('2020-03-01'), get valueFallback () { return data }}
    let param2 : ComparisonValidatorData = {base: () => boundary, valueFallback: () => data }
    let param3 : ComparisonValidatorData = {get base () { return boundary }, get valueFallback () { return data } }
    let param4 : ComparisonValidatorData = {base: new Date('2020-03-01'), get valueFallback () { return dataDate }}
    let param5 : ComparisonValidatorData = {base: () => boundary, valueFallback: () => dataDate }
    let param6 : ComparisonValidatorData = {get base () { return boundary }, get valueFallback () { return dataDate } }
  
    const validator1: ValidatorStore = createFieldValidator([lessThanValidator(param)])
    const validator2: ValidatorStore = createFieldValidator([lessThanValidator(param2)])
    const validator3: ValidatorStore = createFieldValidator([lessThanValidator(param3)])
    const validator4: ValidatorStore = createFieldValidator([lessThanValidator(param4)])
    const validator5: ValidatorStore = createFieldValidator([lessThanValidator(param5)])
    const validator6: ValidatorStore = createFieldValidator([lessThanValidator(param6)])

    const lessThanFailsForDate: IsValid = {
      message: 'Please select a value less than 2020-03-01T00:00:00.000Z!',
      error: 'VALUE_IS_NOT_SMALL_ENOUGH',
      valid: false
    }

    const lessThanFailsForDate0229: IsValid = {
      message: 'Please select a value less than 2020-02-29T00:00:00.000Z!',
      error: 'VALUE_IS_NOT_SMALL_ENOUGH',
      valid: false
    }

    expect(validator1.validate()).toEqual({valid: true, validatedValue: [new Date('2020-02-29')]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [new Date('2020-02-29')]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [new Date('2020-02-29')]})
    expect(validator4.validate()).toEqual({valid: true, validatedValue: [new Date('2020-02-29')]})
    expect(validator5.validate()).toEqual({valid: true, validatedValue: [new Date('2020-02-29')]})
    expect(validator6.validate()).toEqual({valid: true, validatedValue: [new Date('2020-02-29')]})

    expect(validator1.validate({data: {valueFallback: '2020-02-28'}})).toEqual({valid: true, validatedValue: [new Date('2020-02-28')]})
    expect(validator2.validate({data: {valueFallback: '2020-02-28'}})).toEqual({valid: true, validatedValue: [new Date('2020-02-28')]})
    expect(validator3.validate({data: {valueFallback: '2020-02-28'}})).toEqual({valid: true, validatedValue: [new Date('2020-02-28')]})
    expect(validator4.validate({data: {valueFallback: '2020-02-28'}})).toEqual({valid: true, validatedValue: [new Date('2020-02-28')]})
    expect(validator5.validate({data: {valueFallback: '2020-02-28'}})).toEqual({valid: true, validatedValue: [new Date('2020-02-28')]})
    expect(validator6.validate({data: {valueFallback: '2020-02-28'}})).toEqual({valid: true, validatedValue: [new Date('2020-02-28')]})

    expect(validator1.validate({data: {valueFallback: new Date('2020-02-28')}})).toEqual({valid: true, validatedValue: [new Date('2020-02-28')]})
    expect(validator2.validate({data: {valueFallback: new Date('2020-02-28')}})).toEqual({valid: true, validatedValue: [new Date('2020-02-28')]})
    expect(validator3.validate({data: {valueFallback: new Date('2020-02-28')}})).toEqual({valid: true, validatedValue: [new Date('2020-02-28')]})
    expect(validator4.validate({data: {valueFallback: new Date('2020-02-28')}})).toEqual({valid: true, validatedValue: [new Date('2020-02-28')]})
    expect(validator5.validate({data: {valueFallback: new Date('2020-02-28')}})).toEqual({valid: true, validatedValue: [new Date('2020-02-28')]})
    expect(validator6.validate({data: {valueFallback: new Date('2020-02-28')}})).toEqual({valid: true, validatedValue: [new Date('2020-02-28')]})

    data = '2020-03-01T00:00:01+09:00'
    dataDate = new Date('2020-03-01T00:00:01+09:00')
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:01+09:00')]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:01+09:00')]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:01+09:00')]})
    expect(validator4.validate()).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:01+09:00')]})
    expect(validator5.validate()).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:01+09:00')]})
    expect(validator6.validate()).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:01+09:00')]})

    expect(validator1.validate({data: {valueFallback: '2020-03-01T00:00:02+09:00'}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02+09:00')]})
    expect(validator2.validate({data: {valueFallback: '2020-03-01T00:00:02+09:00'}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02+09:00')]})
    expect(validator3.validate({data: {valueFallback: '2020-03-01T00:00:02+09:00'}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02+09:00')]})
    expect(validator4.validate({data: {valueFallback: '2020-03-01T00:00:02+09:00'}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02+09:00')]})
    expect(validator5.validate({data: {valueFallback: '2020-03-01T00:00:02+09:00'}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02+09:00')]})
    expect(validator6.validate({data: {valueFallback: '2020-03-01T00:00:02+09:00'}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02+09:00')]})

    expect(validator1.validate({data: {valueFallback: new Date('2020-03-01T00:00:02+09:00')}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02+09:00')]})
    expect(validator2.validate({data: {valueFallback: new Date('2020-03-01T00:00:02+09:00')}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02+09:00')]})
    expect(validator3.validate({data: {valueFallback: new Date('2020-03-01T00:00:02+09:00')}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02+09:00')]})
    expect(validator4.validate({data: {valueFallback: new Date('2020-03-01T00:00:02+09:00')}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02+09:00')]})
    expect(validator5.validate({data: {valueFallback: new Date('2020-03-01T00:00:02+09:00')}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02+09:00')]})
    expect(validator6.validate({data: {valueFallback: new Date('2020-03-01T00:00:02+09:00')}})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:02+09:00')]})

    data = '2020-02-29T23:59:59Z'
    dataDate = new Date('2020-02-29T23:59:59Z')
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [new Date('2020-02-29T23:59:59Z')]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [new Date('2020-02-29T23:59:59Z')]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [new Date('2020-02-29T23:59:59Z')]})
    expect(validator4.validate()).toEqual({valid: true, validatedValue: [new Date('2020-02-29T23:59:59Z')]})
    expect(validator5.validate()).toEqual({valid: true, validatedValue: [new Date('2020-02-29T23:59:59Z')]})
    expect(validator6.validate()).toEqual({valid: true, validatedValue: [new Date('2020-02-29T23:59:59Z')]})

    expect(validator1.validate({data: {valueFallback: '2020-02-29T23:59:58Z'}})).toEqual({valid: true, validatedValue: [new Date('2020-02-29T23:59:58Z')]})
    expect(validator2.validate({data: {valueFallback: '2020-02-29T23:59:58Z'}})).toEqual({valid: true, validatedValue: [new Date('2020-02-29T23:59:58Z')]})
    expect(validator3.validate({data: {valueFallback: '2020-02-29T23:59:58Z'}})).toEqual({valid: true, validatedValue: [new Date('2020-02-29T23:59:58Z')]})
    expect(validator4.validate({data: {valueFallback: '2020-02-29T23:59:58Z'}})).toEqual({valid: true, validatedValue: [new Date('2020-02-29T23:59:58Z')]})
    expect(validator5.validate({data: {valueFallback: '2020-02-29T23:59:58Z'}})).toEqual({valid: true, validatedValue: [new Date('2020-02-29T23:59:58Z')]})
    expect(validator6.validate({data: {valueFallback: '2020-02-29T23:59:58Z'}})).toEqual({valid: true, validatedValue: [new Date('2020-02-29T23:59:58Z')]})

    expect(validator1.validate({data: {valueFallback: new Date('2020-02-29T23:59:58Z')}})).toEqual({valid: true, validatedValue: [new Date('2020-02-29T23:59:58Z')]})
    expect(validator2.validate({data: {valueFallback: new Date('2020-02-29T23:59:58Z')}})).toEqual({valid: true, validatedValue: [new Date('2020-02-29T23:59:58Z')]})
    expect(validator3.validate({data: {valueFallback: new Date('2020-02-29T23:59:58Z')}})).toEqual({valid: true, validatedValue: [new Date('2020-02-29T23:59:58Z')]})
    expect(validator4.validate({data: {valueFallback: new Date('2020-02-29T23:59:58Z')}})).toEqual({valid: true, validatedValue: [new Date('2020-02-29T23:59:58Z')]})
    expect(validator5.validate({data: {valueFallback: new Date('2020-02-29T23:59:58Z')}})).toEqual({valid: true, validatedValue: [new Date('2020-02-29T23:59:58Z')]})
    expect(validator6.validate({data: {valueFallback: new Date('2020-02-29T23:59:58Z')}})).toEqual({valid: true, validatedValue: [new Date('2020-02-29T23:59:58Z')]})

    data = '2020-02-30'
    dataDate = new Date('2020-02-30')
    expect(validator1.validate()).toEqual(lessThanFailsForDate)
    expect(validator2.validate()).toEqual(lessThanFailsForDate)
    expect(validator3.validate()).toEqual(lessThanFailsForDate)
    expect(validator4.validate()).toEqual(lessThanFailsForDate)
    expect(validator5.validate()).toEqual(lessThanFailsForDate)
    expect(validator6.validate()).toEqual(lessThanFailsForDate)

    expect(validator1.validate({data: {valueFallback: '2020-02-31'}})).toEqual(lessThanFailsForDate)
    expect(validator2.validate({data: {valueFallback: '2020-02-31'}})).toEqual(lessThanFailsForDate)
    expect(validator3.validate({data: {valueFallback: '2020-02-31'}})).toEqual(lessThanFailsForDate)
    expect(validator4.validate({data: {valueFallback: '2020-02-31'}})).toEqual(lessThanFailsForDate)
    expect(validator5.validate({data: {valueFallback: '2020-02-31'}})).toEqual(lessThanFailsForDate)
    expect(validator6.validate({data: {valueFallback: '2020-02-31'}})).toEqual(lessThanFailsForDate)

    expect(validator1.validate({data: {valueFallback: new Date('2020-02-31')}})).toEqual(lessThanFailsForDate)
    expect(validator2.validate({data: {valueFallback: new Date('2020-02-31')}})).toEqual(lessThanFailsForDate)
    expect(validator3.validate({data: {valueFallback: new Date('2020-02-31')}})).toEqual(lessThanFailsForDate)
    expect(validator4.validate({data: {valueFallback: new Date('2020-02-31')}})).toEqual(lessThanFailsForDate)
    expect(validator5.validate({data: {valueFallback: new Date('2020-02-31')}})).toEqual(lessThanFailsForDate)
    expect(validator6.validate({data: {valueFallback: new Date('2020-02-31')}})).toEqual(lessThanFailsForDate)

    data = '2020-03-01'
    dataDate = new Date('2020-03-01')
    expect(validator1.validate()).toEqual(lessThanFailsForDate)
    expect(validator2.validate()).toEqual(lessThanFailsForDate)
    expect(validator3.validate()).toEqual(lessThanFailsForDate)
    expect(validator4.validate()).toEqual(lessThanFailsForDate)
    expect(validator5.validate()).toEqual(lessThanFailsForDate)
    expect(validator6.validate()).toEqual(lessThanFailsForDate)

    expect(validator1.validate({data: {valueFallback: '2020-03-01'}})).toEqual(lessThanFailsForDate)
    expect(validator2.validate({data: {valueFallback: '2020-03-01'}})).toEqual(lessThanFailsForDate)
    expect(validator3.validate({data: {valueFallback: '2020-03-01'}})).toEqual(lessThanFailsForDate)
    expect(validator4.validate({data: {valueFallback: '2020-03-01'}})).toEqual(lessThanFailsForDate)
    expect(validator5.validate({data: {valueFallback: '2020-03-01'}})).toEqual(lessThanFailsForDate)
    expect(validator6.validate({data: {valueFallback: '2020-03-01'}})).toEqual(lessThanFailsForDate)

    expect(validator1.validate({data: {valueFallback: new Date('2020-03-01')}})).toEqual(lessThanFailsForDate)
    expect(validator2.validate({data: {valueFallback: new Date('2020-03-01')}})).toEqual(lessThanFailsForDate)
    expect(validator3.validate({data: {valueFallback: new Date('2020-03-01')}})).toEqual(lessThanFailsForDate)
    expect(validator4.validate({data: {valueFallback: new Date('2020-03-01')}})).toEqual(lessThanFailsForDate)
    expect(validator5.validate({data: {valueFallback: new Date('2020-03-01')}})).toEqual(lessThanFailsForDate)
    expect(validator6.validate({data: {valueFallback: new Date('2020-03-01')}})).toEqual(lessThanFailsForDate)
    
    data = '2020-02-29'
    dataDate = new Date('2020-02-29')
    boundary = new Date('2020-02-29')
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [new Date('2020-02-29')]})
    expect(validator2.validate()).toEqual(lessThanFailsForDate0229)
    expect(validator3.validate()).toEqual(lessThanFailsForDate0229)
    expect(validator4.validate()).toEqual({valid: true, validatedValue: [new Date('2020-02-29')]})
    expect(validator5.validate()).toEqual(lessThanFailsForDate0229)
    expect(validator6.validate()).toEqual(lessThanFailsForDate0229)

    expect(validator1.validate({data: {valueFallback: '2020-02-29'}})).toEqual({valid: true, validatedValue: [new Date('2020-02-29')]})
    expect(validator2.validate({data: {valueFallback: '2020-02-29'}})).toEqual(lessThanFailsForDate0229)
    expect(validator3.validate({data: {valueFallback: '2020-02-29'}})).toEqual(lessThanFailsForDate0229)
    expect(validator4.validate({data: {valueFallback: '2020-02-29'}})).toEqual({valid: true, validatedValue: [new Date('2020-02-29')]})
    expect(validator5.validate({data: {valueFallback: '2020-02-29'}})).toEqual(lessThanFailsForDate0229)
    expect(validator6.validate({data: {valueFallback: '2020-02-29'}})).toEqual(lessThanFailsForDate0229)

    expect(validator1.validate({data: {valueFallback: new Date('2020-02-29')}})).toEqual({valid: true, validatedValue: [new Date('2020-02-29')]})
    expect(validator2.validate({data: {valueFallback: new Date('2020-02-29')}})).toEqual(lessThanFailsForDate0229)
    expect(validator3.validate({data: {valueFallback: new Date('2020-02-29')}})).toEqual(lessThanFailsForDate0229)
    expect(validator4.validate({data: {valueFallback: new Date('2020-02-29')}})).toEqual({valid: true, validatedValue: [new Date('2020-02-29')]})
    expect(validator5.validate({data: {valueFallback: new Date('2020-02-29')}})).toEqual(lessThanFailsForDate0229)
    expect(validator6.validate({data: {valueFallback: new Date('2020-02-29')}})).toEqual(lessThanFailsForDate0229)
    
    data = '2020-03-01T00:00:00Z'
    dataDate = new Date('2020-03-01T00:00:00Z')
    boundary = new Date('2020-03-01')
    expect(validator1.validate()).toEqual(lessThanFailsForDate)
    expect(validator2.validate()).toEqual(lessThanFailsForDate)
    expect(validator3.validate()).toEqual(lessThanFailsForDate)
    expect(validator4.validate()).toEqual(lessThanFailsForDate)
    expect(validator5.validate()).toEqual(lessThanFailsForDate)
    expect(validator6.validate()).toEqual(lessThanFailsForDate)

    expect(validator1.validate({data: {valueFallback: '2020-03-01T00:00:00Z'}})).toEqual(lessThanFailsForDate)
    expect(validator2.validate({data: {valueFallback: '2020-03-01T00:00:00Z'}})).toEqual(lessThanFailsForDate)
    expect(validator3.validate({data: {valueFallback: '2020-03-01T00:00:00Z'}})).toEqual(lessThanFailsForDate)
    expect(validator4.validate({data: {valueFallback: '2020-03-01T00:00:00Z'}})).toEqual(lessThanFailsForDate)
    expect(validator5.validate({data: {valueFallback: '2020-03-01T00:00:00Z'}})).toEqual(lessThanFailsForDate)
    expect(validator6.validate({data: {valueFallback: '2020-03-01T00:00:00Z'}})).toEqual(lessThanFailsForDate)

    expect(validator1.validate({data: {valueFallback: new Date('2020-03-01T00:00:00Z')}})).toEqual(lessThanFailsForDate)
    expect(validator2.validate({data: {valueFallback: new Date('2020-03-01T00:00:00Z')}})).toEqual(lessThanFailsForDate)
    expect(validator3.validate({data: {valueFallback: new Date('2020-03-01T00:00:00Z')}})).toEqual(lessThanFailsForDate)
    expect(validator4.validate({data: {valueFallback: new Date('2020-03-01T00:00:00Z')}})).toEqual(lessThanFailsForDate)
    expect(validator5.validate({data: {valueFallback: new Date('2020-03-01T00:00:00Z')}})).toEqual(lessThanFailsForDate)
    expect(validator6.validate({data: {valueFallback: new Date('2020-03-01T00:00:00Z')}})).toEqual(lessThanFailsForDate)

    data = '2020-03-01T00:00:00-09:00'
    dataDate = new Date('2020-03-01T00:00:00-09:00')
    expect(validator1.validate()).toEqual(lessThanFailsForDate)
    expect(validator2.validate()).toEqual(lessThanFailsForDate)
    expect(validator3.validate()).toEqual(lessThanFailsForDate)
    expect(validator4.validate()).toEqual(lessThanFailsForDate)
    expect(validator5.validate()).toEqual(lessThanFailsForDate)
    expect(validator6.validate()).toEqual(lessThanFailsForDate)

    expect(validator1.validate({data: {valueFallback: '2020-03-01T00:00:00-09:00'}})).toEqual(lessThanFailsForDate)
    expect(validator2.validate({data: {valueFallback: '2020-03-01T00:00:00-09:00'}})).toEqual(lessThanFailsForDate)
    expect(validator3.validate({data: {valueFallback: '2020-03-01T00:00:00-09:00'}})).toEqual(lessThanFailsForDate)
    expect(validator4.validate({data: {valueFallback: '2020-03-01T00:00:00-09:00'}})).toEqual(lessThanFailsForDate)
    expect(validator5.validate({data: {valueFallback: '2020-03-01T00:00:00-09:00'}})).toEqual(lessThanFailsForDate)
    expect(validator6.validate({data: {valueFallback: '2020-03-01T00:00:00-09:00'}})).toEqual(lessThanFailsForDate)

    expect(validator1.validate({data: {valueFallback: new Date('2020-03-01T00:00:00-09:00')}})).toEqual(lessThanFailsForDate)
    expect(validator2.validate({data: {valueFallback: new Date('2020-03-01T00:00:00-09:00')}})).toEqual(lessThanFailsForDate)
    expect(validator3.validate({data: {valueFallback: new Date('2020-03-01T00:00:00-09:00')}})).toEqual(lessThanFailsForDate)
    expect(validator4.validate({data: {valueFallback: new Date('2020-03-01T00:00:00-09:00')}})).toEqual(lessThanFailsForDate)
    expect(validator5.validate({data: {valueFallback: new Date('2020-03-01T00:00:00-09:00')}})).toEqual(lessThanFailsForDate)
    expect(validator6.validate({data: {valueFallback: new Date('2020-03-01T00:00:00-09:00')}})).toEqual(lessThanFailsForDate)

    data = '2020-03-02'
    dataDate = new Date('2020-03-02')
    expect(validator1.validate()).toEqual(lessThanFailsForDate)
    expect(validator2.validate()).toEqual(lessThanFailsForDate)
    expect(validator3.validate()).toEqual(lessThanFailsForDate)
    expect(validator4.validate()).toEqual(lessThanFailsForDate)
    expect(validator5.validate()).toEqual(lessThanFailsForDate)
    expect(validator6.validate()).toEqual(lessThanFailsForDate)

    expect(validator1.validate({data: {valueFallback: '2020-03-02'}})).toEqual(lessThanFailsForDate)
    expect(validator2.validate({data: {valueFallback: '2020-03-02'}})).toEqual(lessThanFailsForDate)
    expect(validator3.validate({data: {valueFallback: '2020-03-02'}})).toEqual(lessThanFailsForDate)
    expect(validator4.validate({data: {valueFallback: '2020-03-02'}})).toEqual(lessThanFailsForDate)
    expect(validator5.validate({data: {valueFallback: '2020-03-02'}})).toEqual(lessThanFailsForDate)
    expect(validator6.validate({data: {valueFallback: '2020-03-02'}})).toEqual(lessThanFailsForDate)

    expect(validator1.validate({data: {valueFallback: new Date('2020-03-02')}})).toEqual(lessThanFailsForDate)
    expect(validator2.validate({data: {valueFallback: new Date('2020-03-02')}})).toEqual(lessThanFailsForDate)
    expect(validator3.validate({data: {valueFallback: new Date('2020-03-02')}})).toEqual(lessThanFailsForDate)
    expect(validator4.validate({data: {valueFallback: new Date('2020-03-02')}})).toEqual(lessThanFailsForDate)
    expect(validator5.validate({data: {valueFallback: new Date('2020-03-02')}})).toEqual(lessThanFailsForDate)
    expect(validator6.validate({data: {valueFallback: new Date('2020-03-02')}})).toEqual(lessThanFailsForDate)
  })
  it('Less than validator works with custom error message', async () => {
    const errorMessage = 'This is a custom error message'
    const validator1: ValidatorStore = createFieldValidator([lessThanValidator({
      base: 5,
      errorMessage  
    })])

    const lessThanOrEqualFails: IsValid = {
      message: '${This is a custom error message}(en_GB)',
      error: 'This is a custom error message',
      valid: false
    }

    expect(validator1.validate(5)).toEqual(lessThanOrEqualFails)
  })
})