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
  lessThanOrEqualValidator,
} from '../rules/index.js'

import type {
  ComparisonValidatorData,
  IsValid,
  ValidatorStore,
} from '../types.js'

vi.stubEnv('TZ', 'Europe/Berlin');

describe('Test less than or equal validators', () => {
  it('Less than or equal validator works', async () => {
    const validator1: ValidatorStore = createFieldValidator([lessThanOrEqualValidator({base: 5})])
    const validator2: ValidatorStore = createFieldValidator([lessThanOrEqualValidator({base: () => 5})])

    const lessThanFails: IsValid = {
      message: 'Please select a value less than or equal to 5!',
      error: 'VALUE_IS_NOT_SMALL_ENOUGH_ALLOWING_EQUAL',
      valid: false
    }

    expect(validator1.validate(6)).toEqual(lessThanFails)
    expect(validator2.validate(6)).toEqual(lessThanFails)
    expect(validator1.validate({value: 6})).toEqual(lessThanFails)
    expect(validator2.validate({value: 6})).toEqual(lessThanFails)
    expect(validator1.validate(5)).toEqual({valid: true, validatedValue: [{'less-than-or-equal[5]':5}]})
    expect(validator2.validate(5)).toEqual({valid: true, validatedValue: [{'less-than-or-equal[5]':5}]})
    expect(validator1.validate({value: 5})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[5]':5}]})
    expect(validator2.validate({value: 5})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[5]':5}]})
    expect(validator1.validate(4)).toEqual({valid: true, validatedValue: [{'less-than-or-equal[5]':4}]})
    expect(validator2.validate(4)).toEqual({valid: true, validatedValue: [{'less-than-or-equal[5]':4}]})
    expect(validator1.validate({value: 4})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[5]':4}]})
    expect(validator2.validate({value: 4})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[5]':4}]})

  })

  it('Less than or equal validator works with injected runes', async () => {
    let data : number = $state(4)
    let boundary : number = $state(5)
    let param : ComparisonValidatorData = {base: 5, get valueFallback () { return data }}
    let param2 : ComparisonValidatorData = {base: () => boundary, valueFallback: () => data }
    let param3 : ComparisonValidatorData = {get base () { return boundary }, get valueFallback () { return data } }

    const validator1: ValidatorStore = createFieldValidator([lessThanOrEqualValidator(param)])
    const validator2: ValidatorStore = createFieldValidator([lessThanOrEqualValidator(param2)])
    const validator3: ValidatorStore = createFieldValidator([lessThanOrEqualValidator(param3)])
    
    const lessThanFails1: IsValid = {
      message: 'Please select a value less than or equal to 1!',
      error: 'VALUE_IS_NOT_SMALL_ENOUGH_ALLOWING_EQUAL',
      valid: false
    }

    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[5]':4}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[5]':4}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[5]':4}]})
    expect(validator1.validate({data: { valueFallback: 3}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[5]':3}]})
    expect(validator2.validate({data: { valueFallback: 3}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[5]':3}]})
    expect(validator3.validate({data: { valueFallback: 3}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[5]':3}]})

    boundary = 4
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[5]':4}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[4]':4}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[4]':4}]})
    expect(validator1.validate({data: { valueFallback: 3}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[5]':3}]})
    expect(validator2.validate({data: { valueFallback: 3}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[4]':3}]})
    expect(validator3.validate({data: { valueFallback: 3}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[4]':3}]})

    data = 2
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[5]':2}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[4]':2}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[4]':2}]})
    
    boundary = 2
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[5]':2}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2]':2}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2]':2}]})
    expect(validator1.validate({data: { valueFallback: 2}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[5]':2}]})
    expect(validator2.validate({data: { valueFallback: 2}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2]':2}]})
    expect(validator3.validate({data: { valueFallback: 2}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2]':2}]})

    boundary = 1
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[5]':2}]})
    expect(validator2.validate()).toEqual(lessThanFails1)
    expect(validator3.validate()).toEqual(lessThanFails1)
    expect(validator1.validate({data: { valueFallback: 2}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[5]':2}]})
    expect(validator2.validate({data: { valueFallback: 2}})).toEqual(lessThanFails1)
    expect(validator3.validate({data: { valueFallback: 2}})).toEqual(lessThanFails1)

  })

  it('Less than or equal validator works for dates', async () => {
    let data : string = $state('2020-02-29')
    let dataDate : Date = $state(new Date('2020-02-29'))
    let boundary : Date = $state(new Date('2020-03-01'))
    let param : ComparisonValidatorData = {base: new Date('2020-03-01'), get valueFallback () { return data }}
    let param2 : ComparisonValidatorData = {base: () => boundary, valueFallback: () => data }
    let param3 : ComparisonValidatorData = {get base () { return boundary }, get valueFallback () { return data } }
    let param4 : ComparisonValidatorData = {base: new Date('2020-03-01'), get valueFallback () { return dataDate }}
    let param5 : ComparisonValidatorData = {base: () => boundary, valueFallback: () => dataDate }
    let param6 : ComparisonValidatorData = {get base () { return boundary }, get valueFallback () { return dataDate } }
  
    const validator1: ValidatorStore = createFieldValidator([lessThanOrEqualValidator(param)])
    const validator2: ValidatorStore = createFieldValidator([lessThanOrEqualValidator(param2)])
    const validator3: ValidatorStore = createFieldValidator([lessThanOrEqualValidator(param3)])
    const validator4: ValidatorStore = createFieldValidator([lessThanOrEqualValidator(param4)])
    const validator5: ValidatorStore = createFieldValidator([lessThanOrEqualValidator(param5)])
    const validator6: ValidatorStore = createFieldValidator([lessThanOrEqualValidator(param6)])

    const lessThanFailsForDate: IsValid = {
      message: 'Please select a value less than or equal to 2020-03-01T00:00:00.000Z!',
      error: 'VALUE_IS_NOT_SMALL_ENOUGH_ALLOWING_EQUAL',
      valid: false
    }

    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-29').toISOString()}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-29').toISOString()}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-29').toISOString()}]})
    expect(validator4.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-29').toISOString()}]})
    expect(validator5.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-29').toISOString()}]})
    expect(validator6.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-29').toISOString()}]})

    expect(validator1.validate({data: {valueFallback: '2020-02-28'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-28').toISOString()}]})
    expect(validator2.validate({data: {valueFallback: '2020-02-28'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-28').toISOString()}]})
    expect(validator3.validate({data: {valueFallback: '2020-02-28'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-28').toISOString()}]})
    expect(validator4.validate({data: {valueFallback: '2020-02-28'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-28').toISOString()}]})
    expect(validator5.validate({data: {valueFallback: '2020-02-28'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-28').toISOString()}]})
    expect(validator6.validate({data: {valueFallback: '2020-02-28'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-28').toISOString()}]})

    expect(validator1.validate({data: {valueFallback: new Date('2020-02-28')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-28').toISOString()}]})
    expect(validator2.validate({data: {valueFallback: new Date('2020-02-28')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-28').toISOString()}]})
    expect(validator3.validate({data: {valueFallback: new Date('2020-02-28')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-28').toISOString()}]})
    expect(validator4.validate({data: {valueFallback: new Date('2020-02-28')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-28').toISOString()}]})
    expect(validator5.validate({data: {valueFallback: new Date('2020-02-28')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-28').toISOString()}]})
    expect(validator6.validate({data: {valueFallback: new Date('2020-02-28')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-28').toISOString()}]})

    data = '2020-03-01T00:00:01+09:00'
    dataDate = new Date('2020-03-01T00:00:01+09:00')
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01T00:00:01+09:00').toISOString()}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01T00:00:01+09:00').toISOString()}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01T00:00:01+09:00').toISOString()}]})
    expect(validator4.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01T00:00:01+09:00').toISOString()}]})
    expect(validator5.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01T00:00:01+09:00').toISOString()}]})
    expect(validator6.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01T00:00:01+09:00').toISOString()}]})

    expect(validator1.validate({data: {valueFallback: '2020-03-01T00:00:02+09:00'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01T00:00:02+09:00').toISOString()}]})
    expect(validator2.validate({data: {valueFallback: '2020-03-01T00:00:02+09:00'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01T00:00:02+09:00').toISOString()}]})
    expect(validator3.validate({data: {valueFallback: '2020-03-01T00:00:02+09:00'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01T00:00:02+09:00').toISOString()}]})
    expect(validator4.validate({data: {valueFallback: '2020-03-01T00:00:02+09:00'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01T00:00:02+09:00').toISOString()}]})
    expect(validator5.validate({data: {valueFallback: '2020-03-01T00:00:02+09:00'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01T00:00:02+09:00').toISOString()}]})
    expect(validator6.validate({data: {valueFallback: '2020-03-01T00:00:02+09:00'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01T00:00:02+09:00').toISOString()}]})

    expect(validator1.validate({data: {valueFallback: new Date('2020-03-01T00:00:02+09:00')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01T00:00:02+09:00').toISOString()}]})
    expect(validator2.validate({data: {valueFallback: new Date('2020-03-01T00:00:02+09:00')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01T00:00:02+09:00').toISOString()}]})
    expect(validator3.validate({data: {valueFallback: new Date('2020-03-01T00:00:02+09:00')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01T00:00:02+09:00').toISOString()}]})
    expect(validator4.validate({data: {valueFallback: new Date('2020-03-01T00:00:02+09:00')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01T00:00:02+09:00').toISOString()}]})
    expect(validator5.validate({data: {valueFallback: new Date('2020-03-01T00:00:02+09:00')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01T00:00:02+09:00').toISOString()}]})
    expect(validator6.validate({data: {valueFallback: new Date('2020-03-01T00:00:02+09:00')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01T00:00:02+09:00').toISOString()}]})

    data = '2020-02-29T23:59:59Z'
    dataDate = new Date('2020-02-29T23:59:59Z')
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-29T23:59:59Z').toISOString()}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-29T23:59:59Z').toISOString()}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-29T23:59:59Z').toISOString()}]})
    expect(validator4.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-29T23:59:59Z').toISOString()}]})
    expect(validator5.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-29T23:59:59Z').toISOString()}]})
    expect(validator6.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-29T23:59:59Z').toISOString()}]})

    expect(validator1.validate({data: {valueFallback: '2020-02-29T23:59:58Z'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-29T23:59:58Z').toISOString()}]})
    expect(validator2.validate({data: {valueFallback: '2020-02-29T23:59:58Z'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-29T23:59:58Z').toISOString()}]})
    expect(validator3.validate({data: {valueFallback: '2020-02-29T23:59:58Z'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-29T23:59:58Z').toISOString()}]})
    expect(validator4.validate({data: {valueFallback: '2020-02-29T23:59:58Z'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-29T23:59:58Z').toISOString()}]})
    expect(validator5.validate({data: {valueFallback: '2020-02-29T23:59:58Z'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-29T23:59:58Z').toISOString()}]})
    expect(validator6.validate({data: {valueFallback: '2020-02-29T23:59:58Z'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-29T23:59:58Z').toISOString()}]})

    expect(validator1.validate({data: {valueFallback: new Date('2020-02-29T23:59:58Z')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-29T23:59:58Z').toISOString()}]})
    expect(validator2.validate({data: {valueFallback: new Date('2020-02-29T23:59:58Z')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-29T23:59:58Z').toISOString()}]})
    expect(validator3.validate({data: {valueFallback: new Date('2020-02-29T23:59:58Z')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-29T23:59:58Z').toISOString()}]})
    expect(validator4.validate({data: {valueFallback: new Date('2020-02-29T23:59:58Z')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-29T23:59:58Z').toISOString()}]})
    expect(validator5.validate({data: {valueFallback: new Date('2020-02-29T23:59:58Z')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-29T23:59:58Z').toISOString()}]})
    expect(validator6.validate({data: {valueFallback: new Date('2020-02-29T23:59:58Z')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-29T23:59:58Z').toISOString()}]})

    data = '2020-02-30'
    dataDate = new Date('2020-02-30')
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator4.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator5.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator6.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})

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
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator4.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator5.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator6.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})

    expect(validator1.validate({data: {valueFallback: '2020-03-01'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator2.validate({data: {valueFallback: '2020-03-01'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator3.validate({data: {valueFallback: '2020-03-01'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator4.validate({data: {valueFallback: '2020-03-01'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator5.validate({data: {valueFallback: '2020-03-01'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator6.validate({data: {valueFallback: '2020-03-01'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})

    expect(validator1.validate({data: {valueFallback: new Date('2020-03-01')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator2.validate({data: {valueFallback: new Date('2020-03-01')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator3.validate({data: {valueFallback: new Date('2020-03-01')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator4.validate({data: {valueFallback: new Date('2020-03-01')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator5.validate({data: {valueFallback: new Date('2020-03-01')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator6.validate({data: {valueFallback: new Date('2020-03-01')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    
    data = '2020-02-29'
    dataDate = new Date('2020-02-29')
    boundary = new Date('2020-02-29')
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-29').toISOString()}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-02-29T00:00:00.000Z]':new Date('2020-02-29').toISOString()}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-02-29T00:00:00.000Z]':new Date('2020-02-29').toISOString()}]})
    expect(validator4.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-29').toISOString()}]})
    expect(validator5.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-02-29T00:00:00.000Z]':new Date('2020-02-29').toISOString()}]})
    expect(validator6.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-02-29T00:00:00.000Z]':new Date('2020-02-29').toISOString()}]})

    expect(validator1.validate({data: {valueFallback: '2020-02-29'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-29').toISOString()}]})
    expect(validator2.validate({data: {valueFallback: '2020-02-29'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-02-29T00:00:00.000Z]':new Date('2020-02-29').toISOString()}]})
    expect(validator3.validate({data: {valueFallback: '2020-02-29'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-02-29T00:00:00.000Z]':new Date('2020-02-29').toISOString()}]})
    expect(validator4.validate({data: {valueFallback: '2020-02-29'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-29').toISOString()}]})
    expect(validator5.validate({data: {valueFallback: '2020-02-29'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-02-29T00:00:00.000Z]':new Date('2020-02-29').toISOString()}]})
    expect(validator6.validate({data: {valueFallback: '2020-02-29'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-02-29T00:00:00.000Z]':new Date('2020-02-29').toISOString()}]})

    expect(validator1.validate({data: {valueFallback: new Date('2020-02-29')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-29').toISOString()}]})
    expect(validator2.validate({data: {valueFallback: new Date('2020-02-29')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-02-29T00:00:00.000Z]':new Date('2020-02-29').toISOString()}]})
    expect(validator3.validate({data: {valueFallback: new Date('2020-02-29')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-02-29T00:00:00.000Z]':new Date('2020-02-29').toISOString()}]})
    expect(validator4.validate({data: {valueFallback: new Date('2020-02-29')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-02-29').toISOString()}]})
    expect(validator5.validate({data: {valueFallback: new Date('2020-02-29')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-02-29T00:00:00.000Z]':new Date('2020-02-29').toISOString()}]})
    expect(validator6.validate({data: {valueFallback: new Date('2020-02-29')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-02-29T00:00:00.000Z]':new Date('2020-02-29').toISOString()}]})
    
    data = '2020-03-01T00:00:00Z'
    dataDate = new Date('2020-03-01T00:00:00Z')
    boundary = new Date('2020-03-01')
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator4.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator5.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator6.validate()).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})

    expect(validator1.validate({data: {valueFallback: '2020-03-01T00:00:00Z'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator2.validate({data: {valueFallback: '2020-03-01T00:00:00Z'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator3.validate({data: {valueFallback: '2020-03-01T00:00:00Z'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator4.validate({data: {valueFallback: '2020-03-01T00:00:00Z'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator5.validate({data: {valueFallback: '2020-03-01T00:00:00Z'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator6.validate({data: {valueFallback: '2020-03-01T00:00:00Z'}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})

    expect(validator1.validate({data: {valueFallback: new Date('2020-03-01T00:00:00Z')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator2.validate({data: {valueFallback: new Date('2020-03-01T00:00:00Z')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator3.validate({data: {valueFallback: new Date('2020-03-01T00:00:00Z')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator4.validate({data: {valueFallback: new Date('2020-03-01T00:00:00Z')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator5.validate({data: {valueFallback: new Date('2020-03-01T00:00:00Z')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})
    expect(validator6.validate({data: {valueFallback: new Date('2020-03-01T00:00:00Z')}})).toEqual({valid: true, validatedValue: [{'less-than-or-equal[2020-03-01T00:00:00.000Z]':new Date('2020-03-01').toISOString()}]})

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
  it('Less than or equal validator works with cutom error message', async () => {
    const errorMessage = 'This is a custom error message'
    const validator1: ValidatorStore = createFieldValidator([lessThanOrEqualValidator({
      base: 5,
      errorMessage  
    })])

    const lessThanOrEqualFails: IsValid = {
      message: 'This is a custom error message',
      error: 'VALUE_IS_NOT_SMALL_ENOUGH_ALLOWING_EQUAL',
      valid: false
    }

    expect(validator1.validate(6)).toEqual(lessThanOrEqualFails)
  })
})