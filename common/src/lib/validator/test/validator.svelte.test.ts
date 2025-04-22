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
  requiredValidator,
} from '../rules/index.js'

import type {
  IsValid,
  ValidatorStore,
} from '../types.js'

describe('Test validators', () => {
  it('Can use multiple validators', async () => {
    const allowedList = {
      'allowed': true
    }

    const getAllowedList = () => allowedList

    const validator1: ValidatorStore = createFieldValidator([requiredValidator(), allowedListValidator({lookupTable: allowedList})])
    const validator2: ValidatorStore = createFieldValidator([requiredValidator(), allowedListValidator({lookupTable: getAllowedList})])

    const passes: IsValid = {
      valid: true,
      validatedValue: [
        'allowed',
        'allowed',
      ]

    }

    const requiredFails: IsValid = {
      message: 'Please provide a value!',
      error: 'VALUE_REQUIRED',
      valid: false
    }

    const allowedListFails: IsValid = {
      message: 'Please select a value from the list of allowed ones! [allowed]',
      error: 'VALUE_NOT_ALLOWED',
      valid: false
    }

    expect(validator1.validate('allowed')).toEqual(passes)
    expect(validator2.validate('allowed')).toEqual(passes)
    expect(validator1.validate({value: 'allowed'})).toEqual(passes)
    expect(validator2.validate({value: 'allowed'})).toEqual(passes)
    expect(validator1.validate(null)).toEqual(requiredFails) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate(null)).toEqual(requiredFails) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate({value: null})).toEqual(requiredFails) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate({value: null})).toEqual(requiredFails) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate('')).toEqual(requiredFails) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate('')).toEqual(requiredFails) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate({value: ''})).toEqual(requiredFails) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate({value: ''})).toEqual(requiredFails) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate({})).toEqual(allowedListFails) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate({})).toEqual(allowedListFails) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate([])).toEqual(allowedListFails) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate([])).toEqual(allowedListFails) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate('not-allowed')).toEqual(allowedListFails)
    expect(validator2.validate('not-allowed')).toEqual(allowedListFails)
    expect(validator1.validate({value: 'not-allowed'})).toEqual(allowedListFails)
    expect(validator2.validate({value: 'not-allowed'})).toEqual(allowedListFails)
  })
})