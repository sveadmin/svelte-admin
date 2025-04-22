import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  createFieldValidator,
} from '../index.js'

import {
  allowedListValidator,
} from '../rules/index.js'

import type {
  IsValid,
  ValidatorStore,
} from '../types.js'

describe('Test allowed list validators', () => {
  it('Allowed list validator works', async () => {
    const allowedList: {[key: string] : boolean} = {
      'allowed': true
    }

    //Object match needs to be JSON.stringified as key
    const allowedObjectList: {[key: string] : boolean} = {
      '{"allowed":true}': true
    }

    const validator1: ValidatorStore = createFieldValidator([allowedListValidator({lookupTable: allowedList})])
    const validator2: ValidatorStore = createFieldValidator([allowedListValidator({lookupTable: () => allowedList})])
    const validator3: ValidatorStore = createFieldValidator([allowedListValidator({lookupTable: allowedObjectList})])

    const allowedListFails: IsValid = {
      message: 'Please select a value from the list of allowed ones! [allowed]',
      error: 'VALUE_NOT_ALLOWED',
      valid: false
    }

    const allowedObjectListFails: IsValid = {
      message: 'Please select a value from the list of allowed ones! [{\"allowed\":true}]',
      error: 'VALUE_NOT_ALLOWED',
      valid: false
    }

    expect(validator1.validate('allowed')).toEqual({valid: true, validatedValue: ['allowed']})
    expect(validator2.validate('allowed')).toEqual({valid: true, validatedValue: ['allowed']})
    expect(validator1.validate({value: 'allowed'})).toEqual({valid: true, validatedValue: ['allowed']})
    expect(validator2.validate({value: 'allowed'})).toEqual({valid: true, validatedValue: ['allowed']})
    expect(validator3.validate({allowed: true})).toEqual({valid: true, validatedValue: ['{"allowed":true}']})
    expect(validator3.validate({value: {allowed: true}})).toEqual({valid: true, validatedValue: ['{"allowed":true}']})
    expect(validator1.validate(null)).toEqual({valid: true, validatedValue: []}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate(null)).toEqual({valid: true, validatedValue: []}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator3.validate(null)).toEqual({valid: true, validatedValue: []}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate({value: null})).toEqual({valid: true, validatedValue: []}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate({value: null})).toEqual({valid: true, validatedValue: []}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator3.validate({value: null})).toEqual({valid: true, validatedValue: []}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate('')).toEqual({valid: true, validatedValue: []}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate('')).toEqual({valid: true, validatedValue: []}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator3.validate('')).toEqual({valid: true, validatedValue: []}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate({value: ''})).toEqual({valid: true, validatedValue: []}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate({value: ''})).toEqual({valid: true, validatedValue: []}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator3.validate({value: ''})).toEqual({valid: true, validatedValue: []}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate({})).toEqual(allowedListFails) // This is interpret as the value is an empty object and that is not on the list
    expect(validator2.validate({})).toEqual(allowedListFails) // This is interpret as the value is an empty object and that is not on the list
    expect(validator3.validate({})).toEqual(allowedObjectListFails) // This is interpret as the value is an empty object and that is not on the list
    expect(validator1.validate([])).toEqual(allowedListFails) // This is interpret as the value is an empty object and that is not on the list
    expect(validator2.validate([])).toEqual(allowedListFails) // This is interpret as the value is an empty object and that is not on the list
    expect(validator3.validate([])).toEqual(allowedObjectListFails) // This is interpret as the value is an empty object and that is not on the list
    expect(validator1.validate('not-allowed')).toEqual(allowedListFails)
    expect(validator2.validate('not-allowed')).toEqual(allowedListFails)
    expect(validator3.validate('not-allowed')).toEqual(allowedObjectListFails)
    expect(validator1.validate({value: 'not-allowed'})).toEqual(allowedListFails)
    expect(validator2.validate({value: 'not-allowed'})).toEqual(allowedListFails)
    expect(validator3.validate({value: 'not-allowed'})).toEqual(allowedObjectListFails)
    expect(validator3.validate({value: {allowed: false}})).toEqual(allowedObjectListFails)
  })

  it('Allowed list validator works with runes', async () => {
    const allowedList: {[key: string] : boolean} = $state({
      'allowed': true
    })
    let data = $state('not-allowed')
    const validator1: ValidatorStore = createFieldValidator([allowedListValidator({lookupTable: allowedList, get valueFallback () { return data }})])
    const validator2: ValidatorStore = createFieldValidator([allowedListValidator({get lookupTable () { return allowedList}, get valueFallback () { return data }})])
    const validator3: ValidatorStore = createFieldValidator([allowedListValidator({lookupTable: () => allowedList, get valueFallback () { return data }})])

    const allowedListFails: IsValid = {
      message: 'Please select a value from the list of allowed ones! [allowed]',
      error: 'VALUE_NOT_ALLOWED',
      valid: false
    }

    const allowedListFails2: IsValid = {
      message: 'Please select a value from the list of allowed ones! [allowed, late-addition]',
      error: 'VALUE_NOT_ALLOWED',
      valid: false
    }

    expect(validator1.validate('allowed')).toEqual({valid: true, validatedValue: ['allowed']})
    expect(validator2.validate('allowed')).toEqual({valid: true, validatedValue: ['allowed']})
    expect(validator3.validate('allowed')).toEqual({valid: true, validatedValue: ['allowed']})
    expect(validator1.validate('late-addition')).toEqual(allowedListFails)
    expect(validator2.validate('late-addition')).toEqual(allowedListFails)
    expect(validator3.validate('late-addition')).toEqual(allowedListFails)
    expect(validator1.validate('not-allowed')).toEqual(allowedListFails)
    expect(validator2.validate('not-allowed')).toEqual(allowedListFails)
    expect(validator3.validate('not-allowed')).toEqual(allowedListFails)
    expect(validator1.validate()).toEqual(allowedListFails)
    expect(validator2.validate()).toEqual(allowedListFails)
    expect(validator3.validate()).toEqual(allowedListFails)
    expect(validator1.validate({data: { valueFallback: 'not-allowed'}})).toEqual(allowedListFails)
    expect(validator2.validate({data: { valueFallback: 'not-allowed'}})).toEqual(allowedListFails)
    expect(validator3.validate({data: { valueFallback: 'not-allowed'}})).toEqual(allowedListFails)

    allowedList['late-addition'] = true

    expect(validator1.validate('allowed')).toEqual({valid: true, validatedValue: ['allowed']})
    expect(validator2.validate('allowed')).toEqual({valid: true, validatedValue: ['allowed']})
    expect(validator3.validate('allowed')).toEqual({valid: true, validatedValue: ['allowed']})
    expect(validator1.validate('late-addition')).toEqual({valid: true, validatedValue: ['late-addition']}) // As allowed list is an object it does reflect changes
    expect(validator2.validate('late-addition')).toEqual({valid: true, validatedValue: ['late-addition']})
    expect(validator3.validate('late-addition')).toEqual({valid: true, validatedValue: ['late-addition']})
    expect(validator1.validate('not-allowed')).toEqual(allowedListFails2)
    expect(validator2.validate('not-allowed')).toEqual(allowedListFails2)
    expect(validator3.validate('not-allowed')).toEqual(allowedListFails2)
    expect(validator1.validate()).toEqual(allowedListFails2)
    expect(validator2.validate()).toEqual(allowedListFails2)
    expect(validator3.validate()).toEqual(allowedListFails2)
    expect(validator1.validate({data: { valueFallback: 'not-allowed'}})).toEqual(allowedListFails2)
    expect(validator2.validate({data: { valueFallback: 'not-allowed'}})).toEqual(allowedListFails2)
    expect(validator3.validate({data: { valueFallback: 'not-allowed'}})).toEqual(allowedListFails2)

    data = 'late-addition'
    expect(validator1.validate('late-addition')).toEqual({valid: true, validatedValue: ['late-addition']}) // As allowed list is an object it does reflect changes
    expect(validator2.validate('late-addition')).toEqual({valid: true, validatedValue: ['late-addition']})
    expect(validator3.validate('late-addition')).toEqual({valid: true, validatedValue: ['late-addition']})
    expect(validator1.validate({data: { valueFallback: 'not-allowed'}})).toEqual(allowedListFails2)
    expect(validator2.validate({data: { valueFallback: 'not-allowed'}})).toEqual(allowedListFails2)
    expect(validator3.validate({data: { valueFallback: 'not-allowed'}})).toEqual(allowedListFails2)
  })
})