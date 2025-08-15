import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  createFieldValidator,
} from '../index.js'

import {
  blockedListValidator,
} from '../rules/index.js'

import type {
  IsValid,
  ValidatorStore,
} from '../types.js'


describe('Test blocked list validators', () => {
  it('Blocked list validator works', async () => {
    const blockedList: {[key: string] : boolean} = {
      'not-allowed': true,
    }

    //Object match needs to be JSON.stringified as key
    const blockedObjectList: {[key: string] : boolean} = {
      '{"not-allowed":true}': true
    }

    const validator1: ValidatorStore = createFieldValidator([blockedListValidator({lookupTable: blockedList})])
    const validator2: ValidatorStore = createFieldValidator([blockedListValidator({lookupTable: () => blockedList})])
    const validator3: ValidatorStore = createFieldValidator([blockedListValidator({lookupTable: blockedObjectList})])

    const blockedListFails: IsValid = {
      message: 'Please select a different value, this is not allowed! [not-allowed]',
      error: 'VALUE_BLOCKED',
      valid: false
    }

    const blockedObjectListFails: IsValid = {
      message: 'Please select a different value, this is not allowed! [{\"not-allowed\":true}]',
      error: 'VALUE_BLOCKED',
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
    expect(validator1.validate({})).toEqual({valid: true, validatedValue: ["{}"]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate({})).toEqual({valid: true, validatedValue: ["{}"]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator3.validate({})).toEqual({valid: true, validatedValue: ["{}"]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate([])).toEqual({valid: true, validatedValue: ["[]"]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate([])).toEqual({valid: true, validatedValue: ["[]"]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator3.validate([])).toEqual({valid: true, validatedValue: ["[]"]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate('not-allowed')).toEqual(blockedListFails)
    expect(validator2.validate('not-allowed')).toEqual(blockedListFails)
    expect(validator3.validate({'not-allowed':true})).toEqual(blockedObjectListFails)
    expect(validator1.validate({value: 'not-allowed'})).toEqual(blockedListFails)
    expect(validator2.validate({value: 'not-allowed'})).toEqual(blockedListFails)
    expect(validator3.validate({value: {'not-allowed':true}})).toEqual(blockedObjectListFails)
    expect(validator3.validate({value: {'not-allowed': false}})).toEqual({valid: true, validatedValue: ['{"not-allowed":false}']})
  })

  it('Blocked list validator works with runes', async () => {
    const blockedList: {[key: string] : boolean} = $state({
      'not-allowed': true
    })
    let data = $state('allowed')
    const validator1: ValidatorStore = createFieldValidator([blockedListValidator({lookupTable: blockedList, get valueFallback () { return data }})])
    const validator2: ValidatorStore = createFieldValidator([blockedListValidator({get lookupTable () { return blockedList}, get valueFallback () { return data }})])
    const validator3: ValidatorStore = createFieldValidator([blockedListValidator({lookupTable: () => blockedList, get valueFallback () { return data }})])

    const blockedListFails: IsValid = {
      message: 'Please select a different value, this is not allowed! [not-allowed]',
      error: 'VALUE_BLOCKED',
      valid: false
    }

    const blockedListFails2: IsValid = {
      message: 'Please select a different value, this is not allowed! [not-allowed, late-addition]',
      error: 'VALUE_BLOCKED',
      valid: false
    }

    expect(validator1.validate('allowed')).toEqual({valid: true, validatedValue: ['allowed']})
    expect(validator2.validate('allowed')).toEqual({valid: true, validatedValue: ['allowed']})
    expect(validator3.validate('allowed')).toEqual({valid: true, validatedValue: ['allowed']})
    expect(validator1.validate('late-addition')).toEqual({valid: true, validatedValue: ['late-addition']})
    expect(validator2.validate('late-addition')).toEqual({valid: true, validatedValue: ['late-addition']})
    expect(validator3.validate('late-addition')).toEqual({valid: true, validatedValue: ['late-addition']})
    expect(validator1.validate('not-allowed')).toEqual(blockedListFails)
    expect(validator2.validate('not-allowed')).toEqual(blockedListFails)
    expect(validator3.validate('not-allowed')).toEqual(blockedListFails)
    expect(validator1.validate()).toEqual({valid: true, validatedValue: ['allowed']})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: ['allowed']})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: ['allowed']})
    expect(validator1.validate({data: { valueFallback: 'not-allowed'}})).toEqual(blockedListFails)
    expect(validator2.validate({data: { valueFallback: 'not-allowed'}})).toEqual(blockedListFails)
    expect(validator3.validate({data: { valueFallback: 'not-allowed'}})).toEqual(blockedListFails)

    blockedList['late-addition'] = true

    expect(validator1.validate('allowed')).toEqual({valid: true, validatedValue: ['allowed']})
    expect(validator2.validate('allowed')).toEqual({valid: true, validatedValue: ['allowed']})
    expect(validator3.validate('allowed')).toEqual({valid: true, validatedValue: ['allowed']})
    expect(validator1.validate('late-addition')).toEqual(blockedListFails2) // As allowed list is an object it does reflect changes
    expect(validator2.validate('late-addition')).toEqual(blockedListFails2)
    expect(validator3.validate('late-addition')).toEqual(blockedListFails2)
    expect(validator1.validate('not-allowed')).toEqual(blockedListFails2)
    expect(validator2.validate('not-allowed')).toEqual(blockedListFails2)
    expect(validator3.validate('not-allowed')).toEqual(blockedListFails2)
    expect(validator1.validate()).toEqual({valid: true, validatedValue: ['allowed']})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: ['allowed']})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: ['allowed']})
    expect(validator1.validate({data: { valueFallback: 'not-allowed'}})).toEqual(blockedListFails2)
    expect(validator2.validate({data: { valueFallback: 'not-allowed'}})).toEqual(blockedListFails2)
    expect(validator3.validate({data: { valueFallback: 'not-allowed'}})).toEqual(blockedListFails2)

    data = 'late-addition'
    expect(validator1.validate('late-addition')).toEqual(blockedListFails2) // As allowed list is an object it does reflect changes
    expect(validator2.validate('late-addition')).toEqual(blockedListFails2)
    expect(validator3.validate('late-addition')).toEqual(blockedListFails2)
    expect(validator1.validate({data: { valueFallback: 'not-allowed'}})).toEqual(blockedListFails2)
    expect(validator2.validate({data: { valueFallback: 'not-allowed'}})).toEqual(blockedListFails2)
    expect(validator3.validate({data: { valueFallback: 'not-allowed'}})).toEqual(blockedListFails2)
  })
  it('Blocked list validator works with custom error message', async () => {
    const errorMessage = 'This is a custom error message'
    const blockedList: {[key: string] : boolean} = {
      'not-allowed': true
    }

    const validator1: ValidatorStore = createFieldValidator([blockedListValidator({
      errorMessage,
      lookupTable: blockedList,
    })])

    const blockedListFails: IsValid = {
      message: '${This is a custom error message}(en_GB)',
      error: 'VALUE_BLOCKED',
      valid: false
    }

    expect(validator1.validate('not-allowed')).toEqual(blockedListFails)
  })
})