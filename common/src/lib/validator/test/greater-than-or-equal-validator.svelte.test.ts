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
  greaterThanOrEqualValidator,
} from '../rules/index.js'

import type {
  ComparisonValidatorData,
  IsValid,
  ValidatorStore,
} from '../types.js'

vi.stubEnv('TZ', 'Europe/Berlin');

describe('Test greater than or equal validators', () => {
  it('Greater than validator works', async () => {
    const validator1: ValidatorStore = createFieldValidator([greaterThanOrEqualValidator({base: 5})])
    const validator2: ValidatorStore = createFieldValidator([greaterThanOrEqualValidator({base: () => 5})])

    const greaterThanFails: IsValid = {
      message: 'Please select a value greater than or equal to 5!',
      error: 'VALUE_IS_NOT_BIG_ENOUGH_ALLOWING_EQUAL',
      valid: false
    }

    expect(validator1.validate(6)).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[5]':6}]})
    expect(validator2.validate(6)).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[5]':6}]})
    expect(validator1.validate({value: 6})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[5]':6}]})
    expect(validator2.validate({value: 6})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[5]':6}]})
    expect(validator1.validate(5)).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[5]':5}]})
    expect(validator2.validate(5)).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[5]':5}]})
    expect(validator1.validate({value: 5})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[5]':5}]})
    expect(validator2.validate({value: 5})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[5]':5}]})
    expect(validator1.validate(4)).toEqual(greaterThanFails)
    expect(validator2.validate(4)).toEqual(greaterThanFails)
    expect(validator1.validate({value: 4})).toEqual(greaterThanFails)
    expect(validator2.validate({value: 4})).toEqual(greaterThanFails)

  })

  it('Greater than validator works with injected runes', async () => {
    let data : number = $state(6)
    let boundary : number = $state(5)
    let param : ComparisonValidatorData = {base: 5, get valueFallback () { return data }}
    let param2 : ComparisonValidatorData = {base: () => boundary, valueFallback: () => data }
    let param3 : ComparisonValidatorData = {get base () { return boundary }, get valueFallback () { return data } }

    const validator1: ValidatorStore = createFieldValidator([greaterThanOrEqualValidator(param)])
    const validator2: ValidatorStore = createFieldValidator([greaterThanOrEqualValidator(param2)])
    const validator3: ValidatorStore = createFieldValidator([greaterThanOrEqualValidator(param3)])
    
    const greaterThanFails9: IsValid = {
      message: 'Please select a value greater than or equal to 9!',
      error: 'VALUE_IS_NOT_BIG_ENOUGH_ALLOWING_EQUAL',
      valid: false
    }

    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[5]':6}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[5]':6}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[5]':6}]})
    expect(validator1.validate({data: { valueFallback: 7}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[5]':7}]})
    expect(validator2.validate({data: { valueFallback: 7}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[5]':7}]})
    expect(validator3.validate({data: { valueFallback: 7}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[5]':7}]})

    boundary = 6
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[5]':6}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[6]':6}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[6]':6}]})
    expect(validator1.validate({data: { valueFallback: 7}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[5]':7}]})
    expect(validator2.validate({data: { valueFallback: 7}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[6]':7}]})
    expect(validator3.validate({data: { valueFallback: 7}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[6]':7}]})

    data = 8
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[5]':8}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[6]':8}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[6]':8}]})
    
    boundary = 8
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[5]':8}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[8]':8}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[8]':8}]})
    expect(validator1.validate({data: { valueFallback: 8}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[5]':8}]})
    expect(validator2.validate({data: { valueFallback: 8}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[8]':8}]})
    expect(validator3.validate({data: { valueFallback: 8}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[8]':8}]})

    boundary = 9
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[5]':8}]})
    expect(validator2.validate()).toEqual(greaterThanFails9)
    expect(validator3.validate()).toEqual(greaterThanFails9)
    expect(validator1.validate({data: { valueFallback: 8}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[5]':8}]})
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
  
    const validator1: ValidatorStore = createFieldValidator([greaterThanOrEqualValidator(param)])
    const validator2: ValidatorStore = createFieldValidator([greaterThanOrEqualValidator(param2)])
    const validator3: ValidatorStore = createFieldValidator([greaterThanOrEqualValidator(param3)])
    const validator4: ValidatorStore = createFieldValidator([greaterThanOrEqualValidator(param4)])
    const validator5: ValidatorStore = createFieldValidator([greaterThanOrEqualValidator(param5)])
    const validator6: ValidatorStore = createFieldValidator([greaterThanOrEqualValidator(param6)])

    const greaterThanFailsForDate: IsValid = {
      message: 'Please select a value greater than or equal to 2020-03-01T00:00:00.000Z!',
      error: 'VALUE_IS_NOT_BIG_ENOUGH_ALLOWING_EQUAL',
      valid: false
    }

    const greaterThanFailsForDate0302: IsValid = {
      message: 'Please select a value greater than or equal to 2020-03-02T00:00:00.000Z!',
      error: 'VALUE_IS_NOT_BIG_ENOUGH_ALLOWING_EQUAL',
      valid: false
    }

    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator4.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator5.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator6.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})

    expect(validator1.validate({data: {valueFallback: '2020-03-03'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-03').toISOString()}]})
    expect(validator2.validate({data: {valueFallback: '2020-03-03'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-03').toISOString()}]})
    expect(validator3.validate({data: {valueFallback: '2020-03-03'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-03').toISOString()}]})
    expect(validator4.validate({data: {valueFallback: '2020-03-03'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-03').toISOString()}]})
    expect(validator5.validate({data: {valueFallback: '2020-03-03'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-03').toISOString()}]})
    expect(validator6.validate({data: {valueFallback: '2020-03-03'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-03').toISOString()}]})

    expect(validator1.validate({data: {valueFallback: new Date('2020-03-03')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-03').toISOString()}]})
    expect(validator2.validate({data: {valueFallback: new Date('2020-03-03')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-03').toISOString()}]})
    expect(validator3.validate({data: {valueFallback: new Date('2020-03-03')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-03').toISOString()}]})
    expect(validator4.validate({data: {valueFallback: new Date('2020-03-03')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-03').toISOString()}]})
    expect(validator5.validate({data: {valueFallback: new Date('2020-03-03')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-03').toISOString()}]})
    expect(validator6.validate({data: {valueFallback: new Date('2020-03-03')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-03').toISOString()}]})

    data = '2020-03-01T00:00:01-09:00'
    dataDate = new Date('2020-03-01T00:00:01-09:00')
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:01-09:00').toISOString()}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:01-09:00').toISOString()}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:01-09:00').toISOString()}]})
    expect(validator4.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:01-09:00').toISOString()}]})
    expect(validator5.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:01-09:00').toISOString()}]})
    expect(validator6.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:01-09:00').toISOString()}]})

    expect(validator1.validate({data: {valueFallback: '2020-03-01T00:00:02-09:00'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:02-09:00').toISOString()}]})
    expect(validator2.validate({data: {valueFallback: '2020-03-01T00:00:02-09:00'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:02-09:00').toISOString()}]})
    expect(validator3.validate({data: {valueFallback: '2020-03-01T00:00:02-09:00'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:02-09:00').toISOString()}]})
    expect(validator4.validate({data: {valueFallback: '2020-03-01T00:00:02-09:00'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:02-09:00').toISOString()}]})
    expect(validator5.validate({data: {valueFallback: '2020-03-01T00:00:02-09:00'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:02-09:00').toISOString()}]})
    expect(validator6.validate({data: {valueFallback: '2020-03-01T00:00:02-09:00'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:02-09:00').toISOString()}]})

    expect(validator1.validate({data: {valueFallback: new Date('2020-03-01T00:00:02-09:00')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:02-09:00').toISOString()}]})
    expect(validator2.validate({data: {valueFallback: new Date('2020-03-01T00:00:02-09:00')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:02-09:00').toISOString()}]})
    expect(validator3.validate({data: {valueFallback: new Date('2020-03-01T00:00:02-09:00')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:02-09:00').toISOString()}]})
    expect(validator4.validate({data: {valueFallback: new Date('2020-03-01T00:00:02-09:00')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:02-09:00').toISOString()}]})
    expect(validator5.validate({data: {valueFallback: new Date('2020-03-01T00:00:02-09:00')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:02-09:00').toISOString()}]})
    expect(validator6.validate({data: {valueFallback: new Date('2020-03-01T00:00:02-09:00')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:02-09:00').toISOString()}]})

    data = '2020-03-01T00:00:01Z'
    dataDate = new Date('2020-03-01T00:00:01Z')
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:01Z').toISOString()}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:01Z').toISOString()}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:01Z').toISOString()}]})
    expect(validator4.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:01Z').toISOString()}]})
    expect(validator5.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:01Z').toISOString()}]})
    expect(validator6.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:01Z').toISOString()}]})

    expect(validator1.validate({data: {valueFallback: '2020-03-01T00:00:02Z'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:02Z').toISOString()}]})
    expect(validator2.validate({data: {valueFallback: '2020-03-01T00:00:02Z'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:02Z').toISOString()}]})
    expect(validator3.validate({data: {valueFallback: '2020-03-01T00:00:02Z'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:02Z').toISOString()}]})
    expect(validator4.validate({data: {valueFallback: '2020-03-01T00:00:02Z'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:02Z').toISOString()}]})
    expect(validator5.validate({data: {valueFallback: '2020-03-01T00:00:02Z'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:02Z').toISOString()}]})
    expect(validator6.validate({data: {valueFallback: '2020-03-01T00:00:02Z'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:02Z').toISOString()}]})

    expect(validator1.validate({data: {valueFallback: new Date('2020-03-01T00:00:02Z')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:02Z').toISOString()}]})
    expect(validator2.validate({data: {valueFallback: new Date('2020-03-01T00:00:02Z')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:02Z').toISOString()}]})
    expect(validator3.validate({data: {valueFallback: new Date('2020-03-01T00:00:02Z')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:02Z').toISOString()}]})
    expect(validator4.validate({data: {valueFallback: new Date('2020-03-01T00:00:02Z')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:02Z').toISOString()}]})
    expect(validator5.validate({data: {valueFallback: new Date('2020-03-01T00:00:02Z')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:02Z').toISOString()}]})
    expect(validator6.validate({data: {valueFallback: new Date('2020-03-01T00:00:02Z')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:02Z').toISOString()}]})

    data = '2020-02-31'
    dataDate = new Date('2020-02-31')
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator4.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator5.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator6.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})

    expect(validator1.validate({data: {valueFallback: '2020-02-31'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator2.validate({data: {valueFallback: '2020-02-31'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator3.validate({data: {valueFallback: '2020-02-31'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator4.validate({data: {valueFallback: '2020-02-31'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator5.validate({data: {valueFallback: '2020-02-31'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator6.validate({data: {valueFallback: '2020-02-31'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})

    expect(validator1.validate({data: {valueFallback: new Date('2020-02-31')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator2.validate({data: {valueFallback: new Date('2020-02-31')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator3.validate({data: {valueFallback: new Date('2020-02-31')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator4.validate({data: {valueFallback: new Date('2020-02-31')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator5.validate({data: {valueFallback: new Date('2020-02-31')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator6.validate({data: {valueFallback: new Date('2020-02-31')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})

    data = '2020-03-01'
    dataDate = new Date('2020-03-01')
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01').toISOString()}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01').toISOString()}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01').toISOString()}]})
    expect(validator4.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01').toISOString()}]})
    expect(validator5.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01').toISOString()}]})
    expect(validator6.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01').toISOString()}]})

    expect(validator1.validate({data: {valueFallback: '2020-03-01'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01').toISOString()}]})
    expect(validator2.validate({data: {valueFallback: '2020-03-01'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01').toISOString()}]})
    expect(validator3.validate({data: {valueFallback: '2020-03-01'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01').toISOString()}]})
    expect(validator4.validate({data: {valueFallback: '2020-03-01'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01').toISOString()}]})
    expect(validator5.validate({data: {valueFallback: '2020-03-01'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01').toISOString()}]})
    expect(validator6.validate({data: {valueFallback: '2020-03-01'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01').toISOString()}]})

    expect(validator1.validate({data: {valueFallback: new Date('2020-03-01')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01').toISOString()}]})
    expect(validator2.validate({data: {valueFallback: new Date('2020-03-01')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01').toISOString()}]})
    expect(validator3.validate({data: {valueFallback: new Date('2020-03-01')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01').toISOString()}]})
    expect(validator4.validate({data: {valueFallback: new Date('2020-03-01')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01').toISOString()}]})
    expect(validator5.validate({data: {valueFallback: new Date('2020-03-01')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01').toISOString()}]})
    expect(validator6.validate({data: {valueFallback: new Date('2020-03-01')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01').toISOString()}]})
    
    data = '2020-03-02'
    dataDate = new Date('2020-03-02')
    boundary = new Date('2020-03-02')
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-02T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-02T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator4.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator5.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-02T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator6.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-02T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})

    expect(validator1.validate({data: {valueFallback: '2020-02-31'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator2.validate({data: {valueFallback: '2020-02-31'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-02T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator3.validate({data: {valueFallback: '2020-02-31'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-02T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator4.validate({data: {valueFallback: '2020-02-31'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator5.validate({data: {valueFallback: '2020-02-31'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-02T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator6.validate({data: {valueFallback: '2020-02-31'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-02T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})

    expect(validator1.validate({data: {valueFallback: new Date('2020-02-31')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator2.validate({data: {valueFallback: new Date('2020-02-31')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-02T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator3.validate({data: {valueFallback: new Date('2020-02-31')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-02T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator4.validate({data: {valueFallback: new Date('2020-02-31')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator5.validate({data: {valueFallback: new Date('2020-02-31')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-02T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    expect(validator6.validate({data: {valueFallback: new Date('2020-02-31')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-02T00:00:00.000Z]': new Date('2020-03-02').toISOString()}]})
    
    data = '2020-03-01T00:00:00Z'
    dataDate = new Date('2020-03-01T00:00:00Z')
    boundary = new Date('2020-03-01')
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:00Z').toISOString()}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:00Z').toISOString()}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:00Z').toISOString()}]})
    expect(validator4.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:00Z').toISOString()}]})
    expect(validator5.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:00Z').toISOString()}]})
    expect(validator6.validate()).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:00Z').toISOString()}]})

    expect(validator1.validate({data: {valueFallback: '2020-03-01T00:00:00Z'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:00Z').toISOString()}]})
    expect(validator2.validate({data: {valueFallback: '2020-03-01T00:00:00Z'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:00Z').toISOString()}]})
    expect(validator3.validate({data: {valueFallback: '2020-03-01T00:00:00Z'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:00Z').toISOString()}]})
    expect(validator4.validate({data: {valueFallback: '2020-03-01T00:00:00Z'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:00Z').toISOString()}]})
    expect(validator5.validate({data: {valueFallback: '2020-03-01T00:00:00Z'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:00Z').toISOString()}]})
    expect(validator6.validate({data: {valueFallback: '2020-03-01T00:00:00Z'}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:00Z').toISOString()}]})

    expect(validator1.validate({data: {valueFallback: new Date('2020-03-01T00:00:00Z')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:00Z').toISOString()}]})
    expect(validator2.validate({data: {valueFallback: new Date('2020-03-01T00:00:00Z')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:00Z').toISOString()}]})
    expect(validator3.validate({data: {valueFallback: new Date('2020-03-01T00:00:00Z')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:00Z').toISOString()}]})
    expect(validator4.validate({data: {valueFallback: new Date('2020-03-01T00:00:00Z')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:00Z').toISOString()}]})
    expect(validator5.validate({data: {valueFallback: new Date('2020-03-01T00:00:00Z')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:00Z').toISOString()}]})
    expect(validator6.validate({data: {valueFallback: new Date('2020-03-01T00:00:00Z')}})).toEqual({valid: true, validatedValue: [{'greater-than-or-equal[2020-03-01T00:00:00.000Z]': new Date('2020-03-01T00:00:00Z').toISOString()}]})

    data = '2020-03-01T00:00:00+09:00'
    dataDate = new Date('2020-03-01T00:00:00+09:00')
    expect(validator1.validate()).toEqual(greaterThanFailsForDate)
    expect(validator2.validate()).toEqual(greaterThanFailsForDate)
    expect(validator3.validate()).toEqual(greaterThanFailsForDate)
    expect(validator4.validate()).toEqual(greaterThanFailsForDate)
    expect(validator5.validate()).toEqual(greaterThanFailsForDate)
    expect(validator6.validate()).toEqual(greaterThanFailsForDate)

    expect(validator1.validate({data: {valueFallback: '2020-03-01T00:00:00+09:00'}})).toEqual(greaterThanFailsForDate)
    expect(validator2.validate({data: {valueFallback: '2020-03-01T00:00:00+09:00'}})).toEqual(greaterThanFailsForDate)
    expect(validator3.validate({data: {valueFallback: '2020-03-01T00:00:00+09:00'}})).toEqual(greaterThanFailsForDate)
    expect(validator4.validate({data: {valueFallback: '2020-03-01T00:00:00+09:00'}})).toEqual(greaterThanFailsForDate)
    expect(validator5.validate({data: {valueFallback: '2020-03-01T00:00:00+09:00'}})).toEqual(greaterThanFailsForDate)
    expect(validator6.validate({data: {valueFallback: '2020-03-01T00:00:00+09:00'}})).toEqual(greaterThanFailsForDate)

    expect(validator1.validate({data: {valueFallback: new Date('2020-03-01T00:00:00+09:00')}})).toEqual(greaterThanFailsForDate)
    expect(validator2.validate({data: {valueFallback: new Date('2020-03-01T00:00:00+09:00')}})).toEqual(greaterThanFailsForDate)
    expect(validator3.validate({data: {valueFallback: new Date('2020-03-01T00:00:00+09:00')}})).toEqual(greaterThanFailsForDate)
    expect(validator4.validate({data: {valueFallback: new Date('2020-03-01T00:00:00+09:00')}})).toEqual(greaterThanFailsForDate)
    expect(validator5.validate({data: {valueFallback: new Date('2020-03-01T00:00:00+09:00')}})).toEqual(greaterThanFailsForDate)
    expect(validator6.validate({data: {valueFallback: new Date('2020-03-01T00:00:00+09:00')}})).toEqual(greaterThanFailsForDate)

    data = '2020-02-29'
    dataDate = new Date('2020-02-29')
    expect(validator1.validate()).toEqual(greaterThanFailsForDate)
    expect(validator2.validate()).toEqual(greaterThanFailsForDate)
    expect(validator3.validate()).toEqual(greaterThanFailsForDate)
    expect(validator4.validate()).toEqual(greaterThanFailsForDate)
    expect(validator5.validate()).toEqual(greaterThanFailsForDate)
    expect(validator6.validate()).toEqual(greaterThanFailsForDate)

    expect(validator1.validate({data: {valueFallback: '2020-02-29'}})).toEqual(greaterThanFailsForDate)
    expect(validator2.validate({data: {valueFallback: '2020-02-29'}})).toEqual(greaterThanFailsForDate)
    expect(validator3.validate({data: {valueFallback: '2020-02-29'}})).toEqual(greaterThanFailsForDate)
    expect(validator4.validate({data: {valueFallback: '2020-02-29'}})).toEqual(greaterThanFailsForDate)
    expect(validator5.validate({data: {valueFallback: '2020-02-29'}})).toEqual(greaterThanFailsForDate)
    expect(validator6.validate({data: {valueFallback: '2020-02-29'}})).toEqual(greaterThanFailsForDate)

    expect(validator1.validate({data: {valueFallback: new Date('2020-02-29')}})).toEqual(greaterThanFailsForDate)
    expect(validator2.validate({data: {valueFallback: new Date('2020-02-29')}})).toEqual(greaterThanFailsForDate)
    expect(validator3.validate({data: {valueFallback: new Date('2020-02-29')}})).toEqual(greaterThanFailsForDate)
    expect(validator4.validate({data: {valueFallback: new Date('2020-02-29')}})).toEqual(greaterThanFailsForDate)
    expect(validator5.validate({data: {valueFallback: new Date('2020-02-29')}})).toEqual(greaterThanFailsForDate)
    expect(validator6.validate({data: {valueFallback: new Date('2020-02-29')}})).toEqual(greaterThanFailsForDate)
  })
  it('Greater than validator works with custom error message', async () => {
    const errorMessage = 'This is a custom error message'
    const validator1: ValidatorStore = createFieldValidator([greaterThanOrEqualValidator({
      base: 5,
      errorMessage  
    })])

    const greaterThanFails: IsValid = {
      message: 'This is a custom error message',
      error: 'VALUE_IS_NOT_BIG_ENOUGH_ALLOWING_EQUAL',
      valid: false
    }

    expect(validator1.validate(4)).toEqual(greaterThanFails)
  })
})