import {
  afterAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest'

import {
  createFieldValidator,
} from '../index.js'

import {
  allowedListValidator,
  blockedListValidator,
  emailValidator,
  greaterThanValidator,
  hasMemberValidator,
  lessThanValidator,
  requiredValidator,
  notEqualToFieldValidator,
  validDateValidator
} from '../rules/index.js'

import type {
  IsValid,
  ValidatorStore,
} from '../types.js'


describe('Test validators', () => {
  it('Required validator works', async () => {
    const validator1: ValidatorStore = createFieldValidator([requiredValidator()])

    const passes: IsValid = {
      valid: true
    }

    const requiredFails: IsValid = {
      message: 'Please provide a value!',
      error: 'VALUE_REQUIRED',
      valid: false
    }

    expect(validator1.validate({value: 'asda'})).toEqual(passes)
    expect(validator1.validate({value: null})).toEqual(requiredFails)
    expect(validator1.validate({value: 'asda'})).toEqual(passes) //No residue after a failed check
  })

  it('Allowed list validator works', async () => {
    const allowedList = {
      'allowed': true
    }

    const getAllowedList = () => allowedList

    const validator1: ValidatorStore = createFieldValidator([allowedListValidator(allowedList)])
    const validator2: ValidatorStore = createFieldValidator([allowedListValidator(getAllowedList)])



    const passes: IsValid = {
      valid: true
    }

    const allowedListFails: IsValid = {
      message: 'Please select a value from the list of allowed ones! [allowed]',
      error: 'VALUE_NOT_ALLOWED',
      valid: false
    }

    expect(validator1.validate({value: 'allowed'})).toEqual(passes)
    expect(validator2.validate({value: 'allowed'})).toEqual(passes)
    expect(validator1.validate({value: null})).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate({value: null})).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate({value: ''})).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate({value: ''})).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate({})).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate({})).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate({value: 'not-allowed'})).toEqual(allowedListFails)
    expect(validator2.validate({value: 'not-allowed'})).toEqual(allowedListFails)
  })

  it('Can use multiple validators', async () => {
    const allowedList = {
      'allowed': true
    }

    const getAllowedList = () => allowedList

    const validator1: ValidatorStore = createFieldValidator([requiredValidator(), allowedListValidator(allowedList)])
    const validator2: ValidatorStore = createFieldValidator([requiredValidator(), allowedListValidator(getAllowedList)])

    const passes: IsValid = {
      valid: true
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

    expect(validator1.validate({value: 'allowed'})).toEqual(passes)
    expect(validator2.validate({value: 'allowed'})).toEqual(passes)
    expect(validator1.validate({value: null})).toEqual(requiredFails) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate({value: null})).toEqual(requiredFails) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate({value: ''})).toEqual(requiredFails) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate({value: ''})).toEqual(requiredFails) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate({})).toEqual(requiredFails) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate({})).toEqual(requiredFails) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate({value: 'not-allowed'})).toEqual(allowedListFails)
    expect(validator2.validate({value: 'not-allowed'})).toEqual(allowedListFails)
  })

  it('Blocked list validator works', async () => {
    const blockedList = {
      'not-allowed': true
    }

    const getBlockedList = () => blockedList

    const validator1: ValidatorStore = createFieldValidator([blockedListValidator(blockedList)])
    const validator2: ValidatorStore = createFieldValidator([blockedListValidator(getBlockedList)])

    const passes: IsValid = {
      valid: true
    }

    const blockedListFails: IsValid = {
      message: 'Please select a different value, this is not allowed! [not-allowed]',
      error: 'VALUE_BLOCKED',
      valid: false
    }

    expect(validator1.validate({value: 'allowed'})).toEqual(passes)
    expect(validator2.validate({value: 'allowed'})).toEqual(passes)
    expect(validator1.validate({value: null})).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate({value: null})).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate({value: ''})).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate({value: ''})).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate({})).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate({})).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate({value: 'not-allowed'})).toEqual(blockedListFails)
    expect(validator2.validate({value: 'not-allowed'})).toEqual(blockedListFails)
  })

  it('Email validator works', async () => {
    const validator1: ValidatorStore = createFieldValidator([emailValidator()])

    const passes: IsValid = {
      valid: true
    }

    const emailFails: IsValid = {
      message: 'Please enter a valid email!',
      error: 'INVALID_EMAIL',
      valid: false
    }

    expect(validator1.validate({value: 'a@b.com'})).toEqual(passes)
    expect(validator1.validate({value: 'a+test@b.com'})).toEqual(passes)
    expect(validator1.validate({value: 'a@b.com.bo'})).toEqual(passes)
    expect(validator1.validate({value: 'a@b.co.ke'})).toEqual(passes)
    expect(validator1.validate({value: 'a[at]b.com'})).toEqual(emailFails)
    expect(validator1.validate({value: 'this is not an email'})).toEqual(emailFails)
    expect(validator1.validate({value: null})).toEqual(emailFails)
  })

  it('Greater than validator works', async () => {
    const validator1: ValidatorStore = createFieldValidator([greaterThanValidator(5)])
    const validator2: ValidatorStore = createFieldValidator([greaterThanValidator(() => 5)])
    const validator3: ValidatorStore = createFieldValidator([greaterThanValidator(new Date('2020-03-01'))])
    const validator4: ValidatorStore = createFieldValidator([greaterThanValidator(() => new Date('2020-03-01'))])

    const passes: IsValid = {
      valid: true
    }

    const greaterThanFails: IsValid = {
      message: 'Please select a value greater than 5!',
      error: 'VALUE_IS_NOT_BIG_ENOUGH',
      valid: false
    }

    const greaterThanFailsForDate: IsValid = {
      message: 'Please select a value greater than 2020-03-01T00:00:00.000Z!',
      error: 'VALUE_IS_NOT_BIG_ENOUGH',
      valid: false
    }

    expect(validator1.validate({value: 6})).toEqual(passes)
    expect(validator2.validate({value: 6})).toEqual(passes)
    expect(validator1.validate({value: 5})).toEqual(greaterThanFails)
    expect(validator2.validate({value: 5})).toEqual(greaterThanFails)
    expect(validator1.validate({value: 4})).toEqual(greaterThanFails)
    expect(validator2.validate({value: 4})).toEqual(greaterThanFails)

    expect(validator3.validate({value: '2020-03-02'})).toEqual(passes)
    expect(validator3.validate({value: new Date('2020-03-02')})).toEqual(passes)
    expect(validator4.validate({value: '2020-03-02'})).toEqual(passes)
    expect(validator4.validate({value: new Date('2020-03-02')})).toEqual(passes)

    expect(validator3.validate({value: '2020-03-01T00:00:01-09:00'})).toEqual(passes)
    expect(validator3.validate({value: new Date('2020-03-01T00:00:01-09:00')})).toEqual(passes)
    expect(validator4.validate({value: '2020-03-01T00:00:01-09:00'})).toEqual(passes)
    expect(validator4.validate({value: new Date('2020-03-01T00:00:01-09:00')})).toEqual(passes)

    expect(validator3.validate({value: '2020-03-01T00:00:01Z'})).toEqual(passes)
    expect(validator3.validate({value: new Date('2020-03-01T00:00:01Z')})).toEqual(passes)
    expect(validator4.validate({value: '2020-03-01T00:00:01Z'})).toEqual(passes)
    expect(validator4.validate({value: new Date('2020-03-01T00:00:01Z')})).toEqual(passes)

    expect(validator3.validate({value: '2020-03-01'})).toEqual(greaterThanFailsForDate)
    expect(validator3.validate({value: new Date('2020-03-01')})).toEqual(greaterThanFailsForDate)
    expect(validator3.validate({value: '2020-03-01'})).toEqual(greaterThanFailsForDate)
    expect(validator4.validate({value: new Date('2020-03-01')})).toEqual(greaterThanFailsForDate)
    expect(validator3.validate({value: '2020-03-01T00:00:00Z'})).toEqual(greaterThanFailsForDate)
    expect(validator3.validate({value: new Date('2020-03-01T00:00:00Z')})).toEqual(greaterThanFailsForDate)
    expect(validator3.validate({value: '2020-03-01T00:00:00Z'})).toEqual(greaterThanFailsForDate)
    expect(validator4.validate({value: new Date('2020-03-01T00:00:00Z')})).toEqual(greaterThanFailsForDate)

    expect(validator3.validate({value: '2020-03-01T00:00:01+09:00'})).toEqual(greaterThanFailsForDate)
    expect(validator3.validate({value: new Date('2020-03-01T00:00:01+09:00')})).toEqual(greaterThanFailsForDate)
    expect(validator4.validate({value: '2020-03-01T00:00:01+09:00'})).toEqual(greaterThanFailsForDate)
    expect(validator4.validate({value: new Date('2020-03-01T00:00:01+09:00')})).toEqual(greaterThanFailsForDate)

    expect(validator4.validate({value: '2020-02-29'})).toEqual(greaterThanFailsForDate)
    expect(validator3.validate({value: new Date('2020-02-29')})).toEqual(greaterThanFailsForDate)
    expect(validator4.validate({value: '2020-02-29'})).toEqual(greaterThanFailsForDate)
    expect(validator4.validate({value: new Date('2020-02-29')})).toEqual(greaterThanFailsForDate)
  })
})