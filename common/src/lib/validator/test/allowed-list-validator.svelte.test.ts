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

    const validator1: ValidatorStore = createFieldValidator([allowedListValidator({isValidatedValueAdded: true, lookupTable: allowedList})])
    const validator2: ValidatorStore = createFieldValidator([allowedListValidator({isValidatedValueAdded: true, lookupTable: () => allowedList})])
    const validator3: ValidatorStore = createFieldValidator([allowedListValidator({isValidatedValueAdded: true, lookupTable: allowedObjectList})])

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

    expect(validator1.validate('allowed')).toEqual({valid: true, validatedValue: [{'allowed-list':'allowed'}]})
    expect(validator2.validate('allowed')).toEqual({valid: true, validatedValue: [{'allowed-list':'allowed'}]})
    expect(validator1.validate({value: 'allowed'})).toEqual({valid: true, validatedValue: [{'allowed-list':'allowed'}]})
    expect(validator2.validate({value: 'allowed'})).toEqual({valid: true, validatedValue: [{'allowed-list':'allowed'}]})
    expect(validator3.validate({allowed: true})).toEqual({valid: true, validatedValue: [{'allowed-list':'{"allowed":true}'}]})
    expect(validator3.validate({value: {allowed: true}})).toEqual({valid: true, validatedValue: [{'allowed-list':'{"allowed":true}'}]})
    expect(validator1.validate(null)).toEqual({valid: true, validatedValue: [{'allowed-list':null}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate(null)).toEqual({valid: true, validatedValue: [{'allowed-list':null}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator3.validate(null)).toEqual({valid: true, validatedValue: [{'allowed-list':null}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate({value: null})).toEqual({valid: true, validatedValue: [{'allowed-list':null}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate({value: null})).toEqual({valid: true, validatedValue: [{'allowed-list':null}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator3.validate({value: null})).toEqual({valid: true, validatedValue: [{'allowed-list':null}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate('')).toEqual({valid: true, validatedValue: [{'allowed-list':''}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate('')).toEqual({valid: true, validatedValue: [{'allowed-list':''}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator3.validate('')).toEqual({valid: true, validatedValue: [{'allowed-list':''}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate({value: ''})).toEqual({valid: true, validatedValue: [{'allowed-list':''}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate({value: ''})).toEqual({valid: true, validatedValue: [{'allowed-list':''}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator3.validate({value: ''})).toEqual({valid: true, validatedValue: [{'allowed-list':''}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
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

  it('Allowed list validator works using a Map', async () => {
    const allowedList: Map<string, boolean> = new Map([
      ['allowed',  true] 
    ])

    //Object match needs to be JSON.stringified as key
    const allowedObjectList: Map<string, boolean> = new Map([
      ['{"allowed":true}',  true] 
    ])

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

    expect(validator1.validate('allowed')).toEqual({valid: true, validatedValue: [{'allowed-list':'allowed'}]})
    expect(validator2.validate('allowed')).toEqual({valid: true, validatedValue: [{'allowed-list':'allowed'}]})
    expect(validator1.validate({value: 'allowed'})).toEqual({valid: true, validatedValue: [{'allowed-list':'allowed'}]})
    expect(validator2.validate({value: 'allowed'})).toEqual({valid: true, validatedValue: [{'allowed-list':'allowed'}]})
    expect(validator3.validate({allowed: true})).toEqual({valid: true, validatedValue: [{'allowed-list':'{"allowed":true}'}]})
    expect(validator3.validate({value: {allowed: true}})).toEqual({valid: true, validatedValue: [{'allowed-list':'{"allowed":true}'}]})
    expect(validator1.validate(null)).toEqual({valid: true, validatedValue: [{'allowed-list':null}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate(null)).toEqual({valid: true, validatedValue: [{'allowed-list':null}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator3.validate(null)).toEqual({valid: true, validatedValue: [{'allowed-list':null}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate({value: null})).toEqual({valid: true, validatedValue: [{'allowed-list':null}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate({value: null})).toEqual({valid: true, validatedValue: [{'allowed-list':null}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator3.validate({value: null})).toEqual({valid: true, validatedValue: [{'allowed-list':null}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate('')).toEqual({valid: true, validatedValue: [{'allowed-list':''}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate('')).toEqual({valid: true, validatedValue: [{'allowed-list':''}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator3.validate('')).toEqual({valid: true, validatedValue: [{'allowed-list':''}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate({value: ''})).toEqual({valid: true, validatedValue: [{'allowed-list':''}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate({value: ''})).toEqual({valid: true, validatedValue: [{'allowed-list':''}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator3.validate({value: ''})).toEqual({valid: true, validatedValue: [{'allowed-list':''}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
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

    expect(validator1.validate('allowed')).toEqual({valid: true, validatedValue: [{'allowed-list':'allowed'}]})
    expect(validator2.validate('allowed')).toEqual({valid: true, validatedValue: [{'allowed-list':'allowed'}]})
    expect(validator3.validate('allowed')).toEqual({valid: true, validatedValue: [{'allowed-list':'allowed'}]})
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

    expect(validator1.validate('allowed')).toEqual({valid: true, validatedValue: [{'allowed-list':'allowed'}]})
    expect(validator2.validate('allowed')).toEqual({valid: true, validatedValue: [{'allowed-list':'allowed'}]})
    expect(validator3.validate('allowed')).toEqual({valid: true, validatedValue: [{'allowed-list':'allowed'}]})
    expect(validator1.validate('late-addition')).toEqual({valid: true, validatedValue: [{'allowed-list':'late-addition'}]}) // As allowed list is an object it does reflect changes
    expect(validator2.validate('late-addition')).toEqual({valid: true, validatedValue: [{'allowed-list':'late-addition'}]})
    expect(validator3.validate('late-addition')).toEqual({valid: true, validatedValue: [{'allowed-list':'late-addition'}]})
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
    expect(validator1.validate('late-addition')).toEqual({valid: true, validatedValue: [{'allowed-list':'late-addition'}]}) // As allowed list is an object it does reflect changes
    expect(validator2.validate('late-addition')).toEqual({valid: true, validatedValue: [{'allowed-list':'late-addition'}]})
    expect(validator3.validate('late-addition')).toEqual({valid: true, validatedValue: [{'allowed-list':'late-addition'}]})
    expect(validator1.validate({data: { valueFallback: 'not-allowed'}})).toEqual(allowedListFails2)
    expect(validator2.validate({data: { valueFallback: 'not-allowed'}})).toEqual(allowedListFails2)
    expect(validator3.validate({data: { valueFallback: 'not-allowed'}})).toEqual(allowedListFails2)
  })

  it('Allowed list validator works with custom error message', async () => {
    const errorMessage = 'This is a custom error message'
    const allowedList: {[key: string] : boolean} = {
      'allowed': true
    }

    const validator1: ValidatorStore = createFieldValidator([allowedListValidator({
      errorMessage,
      lookupTable: allowedList,
    })])

    const allowedListFails: IsValid = {
      message: 'This is a custom error message',
      error: 'VALUE_NOT_ALLOWED',
      valid: false
    }

    expect(validator1.validate('not-allowed')).toEqual(allowedListFails)
  })

  it('Allowed list validator works in case sensitve mode', async () => {
    const allowedList: {[key: string] : boolean} = {
      'allowed': true
    }
    const allowedListUpperCase: {[key: string] : boolean} = {
      'Allowed': true
    }

    const validator1: ValidatorStore = createFieldValidator([allowedListValidator({lookupTable: allowedList})])
    const validator2: ValidatorStore = createFieldValidator([allowedListValidator({isCaseSensitive: true, lookupTable: allowedList})])
    const validator3: ValidatorStore = createFieldValidator([allowedListValidator({lookupTable: allowedListUpperCase})])
    const validator4: ValidatorStore = createFieldValidator([allowedListValidator({isCaseSensitive: true, lookupTable: allowedListUpperCase})])

    const allowedListFails: IsValid = {
      message: 'Please select a value from the list of allowed ones! [allowed]',
      error: 'VALUE_NOT_ALLOWED',
      valid: false
    }

    const allowedListFailsUpperCase: IsValid = {
      message: 'Please select a value from the list of allowed ones! [Allowed]',
      error: 'VALUE_NOT_ALLOWED',
      valid: false
    }

    expect(validator1.validate('allowed')).toEqual({valid: true, validatedValue: [{'allowed-list':'allowed'}]})
    expect(validator2.validate('allowed')).toEqual({valid: true, validatedValue: [{'allowed-list':'allowed'}]})
    expect(validator3.validate('Allowed')).toEqual({valid: true, validatedValue: [{'allowed-list':'Allowed'}]})
    expect(validator4.validate('Allowed')).toEqual({valid: true, validatedValue: [{'allowed-list':'Allowed'}]})

    expect(validator1.validate('ALLOWED')).toEqual({valid: true, validatedValue: [{'allowed-list':'ALLOWED'}]})
    expect(validator2.validate('ALLOWED')).toEqual(allowedListFails)
    expect(validator3.validate('ALLOWED')).toEqual({valid: true, validatedValue: [{'allowed-list':'ALLOWED'}]})
    expect(validator4.validate('ALLOWED')).toEqual(allowedListFailsUpperCase)

    expect(validator1.validate('ALlowED')).toEqual({valid: true, validatedValue: [{'allowed-list':'ALlowED'}]})
    expect(validator2.validate('ALlowED')).toEqual(allowedListFails)
    expect(validator3.validate('ALlowED')).toEqual({valid: true, validatedValue: [{'allowed-list':'ALlowED'}]})
    expect(validator4.validate('ALlowED')).toEqual(allowedListFailsUpperCase)

    expect(validator1.validate({value: 'allowed'})).toEqual({valid: true, validatedValue: [{'allowed-list':'allowed'}]})
    expect(validator2.validate({value: 'allowed'})).toEqual({valid: true, validatedValue: [{'allowed-list':'allowed'}]})
    expect(validator3.validate({value: 'Allowed'})).toEqual({valid: true, validatedValue: [{'allowed-list':'Allowed'}]})
    expect(validator4.validate({value: 'Allowed'})).toEqual({valid: true, validatedValue: [{'allowed-list':'Allowed'}]})

    expect(validator1.validate({value: 'ALLOWED'})).toEqual({valid: true, validatedValue: [{'allowed-list':'ALLOWED'}]})
    expect(validator2.validate({value: 'ALLOWED'})).toEqual(allowedListFails)
    expect(validator3.validate({value: 'ALLOWED'})).toEqual({valid: true, validatedValue: [{'allowed-list':'ALLOWED'}]})
    expect(validator4.validate({value: 'ALLOWED'})).toEqual(allowedListFailsUpperCase)

    expect(validator1.validate({value: 'ALlowED'})).toEqual({valid: true, validatedValue: [{'allowed-list':'ALlowED'}]})
    expect(validator2.validate({value: 'ALlowED'})).toEqual(allowedListFails)
    expect(validator3.validate({value: 'ALlowED'})).toEqual({valid: true, validatedValue: [{'allowed-list':'ALlowED'}]})
    expect(validator4.validate({value: 'ALlowED'})).toEqual(allowedListFailsUpperCase)

    expect(validator1.validate(null)).toEqual({valid: true, validatedValue: [{'allowed-list':null}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate(null)).toEqual({valid: true, validatedValue: [{'allowed-list':null}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator3.validate(null)).toEqual({valid: true, validatedValue: [{'allowed-list':null}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator4.validate(null)).toEqual({valid: true, validatedValue: [{'allowed-list':null}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check

    expect(validator1.validate({value: null})).toEqual({valid: true, validatedValue: [{'allowed-list':null}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate({value: null})).toEqual({valid: true, validatedValue: [{'allowed-list':null}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator3.validate({value: null})).toEqual({valid: true, validatedValue: [{'allowed-list':null}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator4.validate({value: null})).toEqual({valid: true, validatedValue: [{'allowed-list':null}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check

    expect(validator1.validate('')).toEqual({valid: true, validatedValue: [{'allowed-list':''}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate('')).toEqual({valid: true, validatedValue: [{'allowed-list':''}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator3.validate('')).toEqual({valid: true, validatedValue: [{'allowed-list':''}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator4.validate('')).toEqual({valid: true, validatedValue: [{'allowed-list':''}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check

    expect(validator1.validate({value: ''})).toEqual({valid: true, validatedValue: [{'allowed-list':''}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate({value: ''})).toEqual({valid: true, validatedValue: [{'allowed-list':''}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator3.validate({value: ''})).toEqual({valid: true, validatedValue: [{'allowed-list':''}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator4.validate({value: ''})).toEqual({valid: true, validatedValue: [{'allowed-list':''}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check

    expect(validator1.validate({})).toEqual(allowedListFails) // This is interpret as the value is an empty object and that is not on the list
    expect(validator2.validate({})).toEqual(allowedListFails) // This is interpret as the value is an empty object and that is not on the list
    expect(validator3.validate({})).toEqual(allowedListFailsUpperCase) // This is interpret as the value is an empty object and that is not on the list
    expect(validator4.validate({})).toEqual(allowedListFailsUpperCase) // This is interpret as the value is an empty object and that is not on the list

    expect(validator1.validate([])).toEqual(allowedListFails) // This is interpret as the value is an empty object and that is not on the list
    expect(validator2.validate([])).toEqual(allowedListFails) // This is interpret as the value is an empty object and that is not on the list
    expect(validator3.validate([])).toEqual(allowedListFailsUpperCase) // This is interpret as the value is an empty object and that is not on the list
    expect(validator4.validate([])).toEqual(allowedListFailsUpperCase) // This is interpret as the value is an empty object and that is not on the list

    expect(validator1.validate('not-allowed')).toEqual(allowedListFails)
    expect(validator2.validate('not-allowed')).toEqual(allowedListFails)
    expect(validator3.validate('not-allowed')).toEqual(allowedListFailsUpperCase)
    expect(validator4.validate('not-allowed')).toEqual(allowedListFailsUpperCase)

    expect(validator1.validate('NOT-ALLOWED')).toEqual(allowedListFails)
    expect(validator2.validate('NOT-ALLOWED')).toEqual(allowedListFails)
    expect(validator3.validate('NOT-ALLOWED')).toEqual(allowedListFailsUpperCase)
    expect(validator4.validate('NOT-ALLOWED')).toEqual(allowedListFailsUpperCase)

    expect(validator1.validate('NOT-ALlowED')).toEqual(allowedListFails)
    expect(validator2.validate('NOT-ALlowED')).toEqual(allowedListFails)
    expect(validator3.validate('NOT-ALlowED')).toEqual(allowedListFailsUpperCase)
    expect(validator4.validate('NOT-ALlowED')).toEqual(allowedListFailsUpperCase)

    expect(validator1.validate({value: 'not-allowed'})).toEqual(allowedListFails)
    expect(validator2.validate({value: 'not-allowed'})).toEqual(allowedListFails)
    expect(validator3.validate({value: 'not-allowed'})).toEqual(allowedListFailsUpperCase)
    expect(validator4.validate({value: 'not-allowed'})).toEqual(allowedListFailsUpperCase)

    expect(validator1.validate({value: 'NOT-ALLOWED'})).toEqual(allowedListFails)
    expect(validator2.validate({value: 'NOT-ALLOWED'})).toEqual(allowedListFails)
    expect(validator3.validate({value: 'NOT-ALLOWED'})).toEqual(allowedListFailsUpperCase)
    expect(validator4.validate({value: 'NOT-ALLOWED'})).toEqual(allowedListFailsUpperCase)

    expect(validator1.validate({value: 'NOT-ALlowED'})).toEqual(allowedListFails)
    expect(validator2.validate({value: 'NOT-ALlowED'})).toEqual(allowedListFails)
    expect(validator3.validate({value: 'NOT-ALlowED'})).toEqual(allowedListFailsUpperCase)
    expect(validator4.validate({value: 'NOT-ALlowED'})).toEqual(allowedListFailsUpperCase)
  })

  it('Allowed list validator works in case sensitve mode with Map', async () => {
    const allowedList: Map<string, boolean> = new Map([
      ['allowed', true]
    ])
    const allowedListUpperCase: Map<string, boolean> = new Map([
      ['Allowed', true]
    ])

    const validator1: ValidatorStore = createFieldValidator([allowedListValidator({lookupTable: allowedList})])
    const validator2: ValidatorStore = createFieldValidator([allowedListValidator({isCaseSensitive: true, lookupTable: allowedList})])
    const validator3: ValidatorStore = createFieldValidator([allowedListValidator({lookupTable: allowedListUpperCase})])
    const validator4: ValidatorStore = createFieldValidator([allowedListValidator({isCaseSensitive: true, lookupTable: allowedListUpperCase})])

    const allowedListFails: IsValid = {
      message: 'Please select a value from the list of allowed ones! [allowed]',
      error: 'VALUE_NOT_ALLOWED',
      valid: false
    }
    const allowedListFailsUpperCase: IsValid = {
      message: 'Please select a value from the list of allowed ones! [Allowed]',
      error: 'VALUE_NOT_ALLOWED',
      valid: false
    }

    expect(validator1.validate('allowed')).toEqual({valid: true, validatedValue: [{'allowed-list':'allowed'}]})
    expect(validator2.validate('allowed')).toEqual({valid: true, validatedValue: [{'allowed-list':'allowed'}]})
    expect(validator3.validate('Allowed')).toEqual({valid: true, validatedValue: [{'allowed-list':'Allowed'}]})
    expect(validator4.validate('Allowed')).toEqual({valid: true, validatedValue: [{'allowed-list':'Allowed'}]})

    expect(validator1.validate('ALLOWED')).toEqual({valid: true, validatedValue: [{'allowed-list':'ALLOWED'}]})
    expect(validator2.validate('ALLOWED')).toEqual(allowedListFails)
    expect(validator3.validate('ALLOWED')).toEqual({valid: true, validatedValue: [{'allowed-list':'ALLOWED'}]})
    expect(validator4.validate('ALLOWED')).toEqual(allowedListFailsUpperCase)

    expect(validator1.validate('ALlowED')).toEqual({valid: true, validatedValue: [{'allowed-list':'ALlowED'}]})
    expect(validator2.validate('ALlowED')).toEqual(allowedListFails)
    expect(validator3.validate('ALlowED')).toEqual({valid: true, validatedValue: [{'allowed-list':'ALlowED'}]})
    expect(validator4.validate('ALlowED')).toEqual(allowedListFailsUpperCase)

    expect(validator1.validate({value: 'allowed'})).toEqual({valid: true, validatedValue: [{'allowed-list':'allowed'}]})
    expect(validator2.validate({value: 'allowed'})).toEqual({valid: true, validatedValue: [{'allowed-list':'allowed'}]})
    expect(validator3.validate({value: 'Allowed'})).toEqual({valid: true, validatedValue: [{'allowed-list':'Allowed'}]})
    expect(validator4.validate({value: 'Allowed'})).toEqual({valid: true, validatedValue: [{'allowed-list':'Allowed'}]})

    expect(validator1.validate({value: 'ALLOWED'})).toEqual({valid: true, validatedValue: [{'allowed-list':'ALLOWED'}]})
    expect(validator2.validate({value: 'ALLOWED'})).toEqual(allowedListFails)
    expect(validator3.validate({value: 'ALLOWED'})).toEqual({valid: true, validatedValue: [{'allowed-list':'ALLOWED'}]})
    expect(validator4.validate({value: 'ALLOWED'})).toEqual(allowedListFailsUpperCase)

    expect(validator1.validate({value: 'ALlowED'})).toEqual({valid: true, validatedValue: [{'allowed-list':'ALlowED'}]})
    expect(validator2.validate({value: 'ALlowED'})).toEqual(allowedListFails)
    expect(validator3.validate({value: 'ALlowED'})).toEqual({valid: true, validatedValue: [{'allowed-list':'ALlowED'}]})
    expect(validator4.validate({value: 'ALlowED'})).toEqual(allowedListFailsUpperCase)

    expect(validator1.validate(null)).toEqual({valid: true, validatedValue: [{'allowed-list':null}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate(null)).toEqual({valid: true, validatedValue: [{'allowed-list':null}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator3.validate(null)).toEqual({valid: true, validatedValue: [{'allowed-list':null}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator4.validate(null)).toEqual({valid: true, validatedValue: [{'allowed-list':null}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check

    expect(validator1.validate({value: null})).toEqual({valid: true, validatedValue: [{'allowed-list':null}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate({value: null})).toEqual({valid: true, validatedValue: [{'allowed-list':null}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator3.validate({value: null})).toEqual({valid: true, validatedValue: [{'allowed-list':null}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator4.validate({value: null})).toEqual({valid: true, validatedValue: [{'allowed-list':null}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check

    expect(validator1.validate('')).toEqual({valid: true, validatedValue: [{'allowed-list':''}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate('')).toEqual({valid: true, validatedValue: [{'allowed-list':''}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator3.validate('')).toEqual({valid: true, validatedValue: [{'allowed-list':''}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator4.validate('')).toEqual({valid: true, validatedValue: [{'allowed-list':''}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check

    expect(validator1.validate({value: ''})).toEqual({valid: true, validatedValue: [{'allowed-list':''}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate({value: ''})).toEqual({valid: true, validatedValue: [{'allowed-list':''}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator3.validate({value: ''})).toEqual({valid: true, validatedValue: [{'allowed-list':''}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator4.validate({value: ''})).toEqual({valid: true, validatedValue: [{'allowed-list':''}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check

    expect(validator1.validate({})).toEqual(allowedListFails) // This is interpret as the value is an empty object and that is not on the list
    expect(validator2.validate({})).toEqual(allowedListFails) // This is interpret as the value is an empty object and that is not on the list
    expect(validator3.validate({})).toEqual(allowedListFailsUpperCase) // This is interpret as the value is an empty object and that is not on the list
    expect(validator4.validate({})).toEqual(allowedListFailsUpperCase) // This is interpret as the value is an empty object and that is not on the list

    expect(validator1.validate([])).toEqual(allowedListFails) // This is interpret as the value is an empty object and that is not on the list
    expect(validator2.validate([])).toEqual(allowedListFails) // This is interpret as the value is an empty object and that is not on the list
    expect(validator3.validate([])).toEqual(allowedListFailsUpperCase) // This is interpret as the value is an empty object and that is not on the list
    expect(validator4.validate([])).toEqual(allowedListFailsUpperCase) // This is interpret as the value is an empty object and that is not on the list

    expect(validator1.validate('not-allowed')).toEqual(allowedListFails)
    expect(validator2.validate('not-allowed')).toEqual(allowedListFails)
    expect(validator3.validate('not-allowed')).toEqual(allowedListFailsUpperCase)
    expect(validator4.validate('not-allowed')).toEqual(allowedListFailsUpperCase)

    expect(validator1.validate('NOT-ALLOWED')).toEqual(allowedListFails)
    expect(validator2.validate('NOT-ALLOWED')).toEqual(allowedListFails)
    expect(validator3.validate('NOT-ALLOWED')).toEqual(allowedListFailsUpperCase)
    expect(validator4.validate('NOT-ALLOWED')).toEqual(allowedListFailsUpperCase)

    expect(validator1.validate('NOT-ALlowED')).toEqual(allowedListFails)
    expect(validator2.validate('NOT-ALlowED')).toEqual(allowedListFails)
    expect(validator3.validate('NOT-ALlowED')).toEqual(allowedListFailsUpperCase)
    expect(validator4.validate('NOT-ALlowED')).toEqual(allowedListFailsUpperCase)

    expect(validator1.validate({value: 'not-allowed'})).toEqual(allowedListFails)
    expect(validator2.validate({value: 'not-allowed'})).toEqual(allowedListFails)
    expect(validator3.validate({value: 'not-allowed'})).toEqual(allowedListFailsUpperCase)
    expect(validator4.validate({value: 'not-allowed'})).toEqual(allowedListFailsUpperCase)

    expect(validator1.validate({value: 'NOT-ALLOWED'})).toEqual(allowedListFails)
    expect(validator2.validate({value: 'NOT-ALLOWED'})).toEqual(allowedListFails)
    expect(validator3.validate({value: 'NOT-ALLOWED'})).toEqual(allowedListFailsUpperCase)
    expect(validator4.validate({value: 'NOT-ALLOWED'})).toEqual(allowedListFailsUpperCase)

    expect(validator1.validate({value: 'NOT-ALlowED'})).toEqual(allowedListFails)
    expect(validator2.validate({value: 'NOT-ALlowED'})).toEqual(allowedListFails)
    expect(validator3.validate({value: 'NOT-ALlowED'})).toEqual(allowedListFailsUpperCase)
    expect(validator4.validate({value: 'NOT-ALlowED'})).toEqual(allowedListFailsUpperCase)
  })
})