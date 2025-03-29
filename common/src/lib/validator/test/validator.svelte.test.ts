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
  nestedValidator,
  notEqualToFieldValidator,
  requiredValidator,
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

    expect(validator1.validate('asda')).toEqual(passes)
    expect(validator1.validate({value: 'asda'})).toEqual(passes)
    expect(validator1.validate(null)).toEqual(requiredFails)
    expect(validator1.validate({value: null})).toEqual(requiredFails)
    expect(validator1.validate({value: 'asda'})).toEqual(passes) //No residue after a failed check
    expect(validator1.validate({})).toEqual(passes)
    expect(validator1.validate([])).toEqual(passes)
  })

  it('Allowed list validator works', async () => {
    const allowedList = {
      'allowed': true
    }

    //Object match needs to be JSON.stringified as key
    const allowedObjectList = {
      '{"allowed":true}': true
    }

    const getAllowedList = () => allowedList

    const validator1: ValidatorStore = createFieldValidator([allowedListValidator(allowedList)])
    const validator2: ValidatorStore = createFieldValidator([allowedListValidator(getAllowedList)])
    const validator3: ValidatorStore = createFieldValidator([allowedListValidator(allowedObjectList)])

    const passes: IsValid = {
      valid: true
    }

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

    expect(validator1.validate('allowed')).toEqual(passes)
    expect(validator2.validate('allowed')).toEqual(passes)
    expect(validator1.validate({value: 'allowed'})).toEqual(passes)
    expect(validator2.validate({value: 'allowed'})).toEqual(passes)
    expect(validator3.validate({allowed: true})).toEqual(passes)
    expect(validator3.validate({value: {allowed: true}})).toEqual(passes)
    expect(validator1.validate(null)).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate(null)).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator3.validate(null)).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate({value: null})).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate({value: null})).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator3.validate({value: null})).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate('')).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate('')).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator3.validate('')).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate({value: ''})).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate({value: ''})).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator3.validate({value: ''})).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
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

    expect(validator1.validate('allowed')).toEqual(passes)
    expect(validator2.validate('allowed')).toEqual(passes)
    expect(validator1.validate({value: 'allowed'})).toEqual(passes)
    expect(validator2.validate({value: 'allowed'})).toEqual(passes)
    expect(validator1.validate(null)).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate(null)).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate({value: null})).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate({value: null})).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate('')).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate('')).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate({value: ''})).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate({value: ''})).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate({})).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate({})).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate([])).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate([])).toEqual(passes) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate('not-allowed')).toEqual(blockedListFails)
    expect(validator2.validate('not-allowed')).toEqual(blockedListFails)
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

    expect(validator1.validate('a@b.com')).toEqual(passes)
    expect(validator1.validate({value: 'a@b.com'})).toEqual(passes)
    expect(validator1.validate('a+test@b.com')).toEqual(passes)
    expect(validator1.validate({value: 'a+test@b.com'})).toEqual(passes)
    expect(validator1.validate('a@b.com.bo')).toEqual(passes)
    expect(validator1.validate({value: 'a@b.com.bo'})).toEqual(passes)
    expect(validator1.validate('a@b.co.ke')).toEqual(passes)
    expect(validator1.validate({value: 'a@b.co.ke'})).toEqual(passes)
    expect(validator1.validate('a[at]b.com')).toEqual(emailFails)
    expect(validator1.validate({value: 'a[at]b.com'})).toEqual(emailFails)
    expect(validator1.validate('this is not an email')).toEqual(emailFails)
    expect(validator1.validate({value: 'this is not an email'})).toEqual(emailFails)
    expect(validator1.validate(null)).toEqual(emailFails)
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

    expect(validator1.validate(6)).toEqual(passes)
    expect(validator2.validate(6)).toEqual(passes)
    expect(validator1.validate({value: 6})).toEqual(passes)
    expect(validator2.validate({value: 6})).toEqual(passes)
    expect(validator1.validate(5)).toEqual(greaterThanFails)
    expect(validator2.validate(5)).toEqual(greaterThanFails)
    expect(validator1.validate({value: 5})).toEqual(greaterThanFails)
    expect(validator2.validate({value: 5})).toEqual(greaterThanFails)
    expect(validator1.validate(4)).toEqual(greaterThanFails)
    expect(validator2.validate(4)).toEqual(greaterThanFails)
    expect(validator1.validate({value: 4})).toEqual(greaterThanFails)
    expect(validator2.validate({value: 4})).toEqual(greaterThanFails)

    expect(validator3.validate('2020-03-02')).toEqual(passes)
    expect(validator3.validate(new Date('2020-03-02'))).toEqual(passes)
    expect(validator3.validate({value: '2020-03-02'})).toEqual(passes)
    expect(validator3.validate({value: new Date('2020-03-02')})).toEqual(passes)
    expect(validator4.validate('2020-03-02')).toEqual(passes)
    expect(validator4.validate(new Date('2020-03-02'))).toEqual(passes)
    expect(validator4.validate({value: '2020-03-02'})).toEqual(passes)
    expect(validator4.validate({value: new Date('2020-03-02')})).toEqual(passes)

    expect(validator3.validate('2020-03-01T00:00:01-09:00')).toEqual(passes)
    expect(validator3.validate(new Date('2020-03-01T00:00:01-09:00'))).toEqual(passes)
    expect(validator3.validate({value: '2020-03-01T00:00:01-09:00'})).toEqual(passes)
    expect(validator3.validate({value: new Date('2020-03-01T00:00:01-09:00')})).toEqual(passes)
    expect(validator4.validate('2020-03-01T00:00:01-09:00')).toEqual(passes)
    expect(validator4.validate(new Date('2020-03-01T00:00:01-09:00'))).toEqual(passes)
    expect(validator4.validate({value: '2020-03-01T00:00:01-09:00'})).toEqual(passes)
    expect(validator4.validate({value: new Date('2020-03-01T00:00:01-09:00')})).toEqual(passes)

    expect(validator3.validate('2020-03-01T00:00:01Z')).toEqual(passes)
    expect(validator3.validate(new Date('2020-03-01T00:00:01Z'))).toEqual(passes)
    expect(validator3.validate({value: '2020-03-01T00:00:01Z'})).toEqual(passes)
    expect(validator3.validate({value: new Date('2020-03-01T00:00:01Z')})).toEqual(passes)
    expect(validator4.validate('2020-03-01T00:00:01Z')).toEqual(passes)
    expect(validator4.validate(new Date('2020-03-01T00:00:01Z'))).toEqual(passes)
    expect(validator4.validate({value: '2020-03-01T00:00:01Z'})).toEqual(passes)
    expect(validator4.validate({value: new Date('2020-03-01T00:00:01Z')})).toEqual(passes)

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

  it('Has member validator works', async () => {
    const validator1: ValidatorStore = createFieldValidator([hasMemberValidator()])

    const passes: IsValid = {
      valid: true
    }

    const hasMemberFails: IsValid = {
      message: 'At least one member is required!',
      error: 'LIST_IS_EMPTY',
      valid: false
    }

    expect(validator1.validate([1])).toEqual(passes)
    expect(validator1.validate({value: [1]})).toEqual(passes)
    expect(validator1.validate(['a'])).toEqual(passes)
    expect(validator1.validate({value: ['a']})).toEqual(passes)
    expect(validator1.validate({a: 1})).toEqual(passes)
    expect(validator1.validate({value: {a: 1}})).toEqual(passes)
    expect(validator1.validate({a: 'b'})).toEqual(passes)
    expect(validator1.validate({value: {a: 'b'}})).toEqual(passes)
    expect(validator1.validate('a')).toEqual(passes) //String is treated as array here
    expect(validator1.validate({value: 'a'})).toEqual(passes) //String is treated as array here
    expect(validator1.validate(1)).toEqual(hasMemberFails)
    expect(validator1.validate({value: 1})).toEqual(hasMemberFails)
    expect(validator1.validate([])).toEqual(hasMemberFails)
    expect(validator1.validate({value: []})).toEqual(hasMemberFails)
    expect(validator1.validate({})).toEqual(hasMemberFails)
    expect(validator1.validate({value: {}})).toEqual(hasMemberFails)
    expect(validator1.validate(null)).toEqual(hasMemberFails)
    expect(validator1.validate({value: null})).toEqual(hasMemberFails)
    expect(validator1.validate('')).toEqual(hasMemberFails)
    expect(validator1.validate({value: ''})).toEqual(hasMemberFails)
  })


  it('Less than validator works', async () => {
    const validator1: ValidatorStore = createFieldValidator([lessThanValidator(5)])
    const validator2: ValidatorStore = createFieldValidator([lessThanValidator(() => 5)])
    const validator3: ValidatorStore = createFieldValidator([lessThanValidator(new Date('2020-03-01'))])
    const validator4: ValidatorStore = createFieldValidator([lessThanValidator(() => new Date('2020-03-01'))])

    const passes: IsValid = {
      valid: true
    }

    const lessThanFails: IsValid = {
      message: 'Please select a value less than 5!',
      error: 'VALUE_IS_NOT_SMALL_ENOUGH',
      valid: false
    }

    const lesshanFailsForDate: IsValid = {
      message: 'Please select a value less than 2020-03-01T00:00:00.000Z!',
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
    expect(validator1.validate(4)).toEqual(passes)
    expect(validator2.validate(4)).toEqual(passes)
    expect(validator1.validate({value: 4})).toEqual(passes)
    expect(validator2.validate({value: 4})).toEqual(passes)

    expect(validator3.validate('2020-02-29')).toEqual(passes)
    expect(validator3.validate(new Date('2020-02-29'))).toEqual(passes)
    expect(validator3.validate({value: '2020-02-29'})).toEqual(passes)
    expect(validator3.validate({value: new Date('2020-02-29')})).toEqual(passes)
    expect(validator4.validate('2020-02-29')).toEqual(passes)
    expect(validator4.validate(new Date('2020-02-29'))).toEqual(passes)
    expect(validator4.validate({value: '2020-02-29'})).toEqual(passes)
    expect(validator4.validate({value: new Date('2020-02-29')})).toEqual(passes)

    expect(validator3.validate('2020-03-01T00:00:01+09:00')).toEqual(passes)
    expect(validator3.validate(new Date('2020-03-01T00:00:01+09:00'))).toEqual(passes)
    expect(validator3.validate({value: '2020-03-01T00:00:01+09:00'})).toEqual(passes)
    expect(validator3.validate({value: new Date('2020-03-01T00:00:01+09:00')})).toEqual(passes)
    expect(validator4.validate('2020-03-01T00:00:01+09:00')).toEqual(passes)
    expect(validator4.validate(new Date('2020-03-01T00:00:01+09:00'))).toEqual(passes)
    expect(validator4.validate({value: '2020-03-01T00:00:01+09:00'})).toEqual(passes)
    expect(validator4.validate({value: new Date('2020-03-01T00:00:01+09:00')})).toEqual(passes)

    expect(validator3.validate('2020-02-29T23:59:59Z')).toEqual(passes)
    expect(validator3.validate(new Date('2020-02-29T23:59:59Z'))).toEqual(passes)
    expect(validator3.validate({value: '2020-02-29T23:59:59Z'})).toEqual(passes)
    expect(validator3.validate({value: new Date('2020-02-29T23:59:59Z')})).toEqual(passes)
    expect(validator4.validate('2020-02-29T23:59:59Z')).toEqual(passes)
    expect(validator4.validate(new Date('2020-02-29T23:59:59Z'))).toEqual(passes)
    expect(validator4.validate({value: '2020-02-29T23:59:59Z'})).toEqual(passes)
    expect(validator4.validate({value: new Date('2020-02-29T23:59:59Z')})).toEqual(passes)

    expect(validator3.validate('2020-03-01')).toEqual(lesshanFailsForDate)
    expect(validator3.validate(new Date('2020-03-01'))).toEqual(lesshanFailsForDate)
    expect(validator3.validate({value: '2020-03-01'})).toEqual(lesshanFailsForDate)
    expect(validator3.validate({value: new Date('2020-03-01')})).toEqual(lesshanFailsForDate)
    expect(validator4.validate('2020-03-01')).toEqual(lesshanFailsForDate)
    expect(validator4.validate(new Date('2020-03-01'))).toEqual(lesshanFailsForDate)
    expect(validator4.validate({value: '2020-03-01'})).toEqual(lesshanFailsForDate)
    expect(validator4.validate({value: new Date('2020-03-01')})).toEqual(lesshanFailsForDate)
    expect(validator3.validate('2020-03-01T00:00:00Z')).toEqual(lesshanFailsForDate)
    expect(validator3.validate(new Date('2020-03-01T00:00:00Z'))).toEqual(lesshanFailsForDate)
    expect(validator3.validate({value: '2020-03-01T00:00:00Z'})).toEqual(lesshanFailsForDate)
    expect(validator3.validate({value: new Date('2020-03-01T00:00:00Z')})).toEqual(lesshanFailsForDate)
    expect(validator4.validate('2020-03-01T00:00:00Z')).toEqual(lesshanFailsForDate)
    expect(validator4.validate(new Date('2020-03-01T00:00:00Z'))).toEqual(lesshanFailsForDate)
    expect(validator4.validate({value: '2020-03-01T00:00:00Z'})).toEqual(lesshanFailsForDate)
    expect(validator4.validate({value: new Date('2020-03-01T00:00:00Z')})).toEqual(lesshanFailsForDate)

    expect(validator3.validate('2020-03-01T00:00:01-09:00')).toEqual(lesshanFailsForDate)
    expect(validator3.validate(new Date('2020-03-01T00:00:01-09:00'))).toEqual(lesshanFailsForDate)
    expect(validator3.validate({value: '2020-03-01T00:00:01-09:00'})).toEqual(lesshanFailsForDate)
    expect(validator3.validate({value: new Date('2020-03-01T00:00:01-09:00')})).toEqual(lesshanFailsForDate)
    expect(validator4.validate('2020-03-01T00:00:01-09:00')).toEqual(lesshanFailsForDate)
    expect(validator4.validate(new Date('2020-03-01T00:00:01-09:00'))).toEqual(lesshanFailsForDate)
    expect(validator4.validate({value: '2020-03-01T00:00:01-09:00'})).toEqual(lesshanFailsForDate)
    expect(validator4.validate({value: new Date('2020-03-01T00:00:01-09:00')})).toEqual(lesshanFailsForDate)

    expect(validator3.validate('2020-03-02')).toEqual(lesshanFailsForDate)
    expect(validator3.validate(new Date('2020-03-02'))).toEqual(lesshanFailsForDate)
    expect(validator3.validate({value: '2020-03-02'})).toEqual(lesshanFailsForDate)
    expect(validator3.validate({value: new Date('2020-03-02')})).toEqual(lesshanFailsForDate)
    expect(validator4.validate('2020-03-08')).toEqual(lesshanFailsForDate)
    expect(validator4.validate(new Date('2020-03-02'))).toEqual(lesshanFailsForDate)
    expect(validator4.validate({value: '2020-03-08'})).toEqual(lesshanFailsForDate)
    expect(validator4.validate({value: new Date('2020-03-02')})).toEqual(lesshanFailsForDate)
  })

  it('Not equal to field validator works', async () => {
    const validator1: ValidatorStore = createFieldValidator([notEqualToFieldValidator('base')])
    const validator2: ValidatorStore = createFieldValidator([notEqualToFieldValidator('base', true)])
    const validator3: ValidatorStore = createFieldValidator([notEqualToFieldValidator('base', false, true)])
    const validator4: ValidatorStore = createFieldValidator([notEqualToFieldValidator('base', true, true)])

    const passes: IsValid = {
      valid: true
    }

    const notEqualToFieldvalidatorFails: IsValid = {
      message: 'Please select a different value, this matches the value of field `base`!',
      error: 'VALUE_MATCHES_BLACKLISTED_COLUMN',
      valid: false
    }

    expect(validator1.validate({value: 'different', data: {base: 'base'}})).toEqual(passes)
    expect(validator2.validate({value: 'different', data: {base: 'base'}})).toEqual(passes)
    expect(validator3.validate({value: 'different', data: {base: 'base'}})).toEqual(passes)
    expect(validator4.validate({value: 'different', data: {base: 'base'}})).toEqual(passes)

    expect(validator1.validate({value: null, data: {base: null}})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator2.validate({value: null, data: {base: null}})).toEqual(passes)
    expect(validator3.validate({value: null, data: {base: null}})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator4.validate({value: null, data: {base: null}})).toEqual(passes)

    expect(validator1.validate({value: undefined})).toEqual(passes)
    expect(validator2.validate({value: undefined})).toEqual(passes)
    expect(validator3.validate({value: undefined})).toEqual(passes)
    expect(validator4.validate({value: undefined})).toEqual(passes)

    expect(validator1.validate({value: undefined, data: {}})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator2.validate({value: undefined, data: {}})).toEqual(passes)
    expect(validator3.validate({value: undefined, data: {}})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator4.validate({value: undefined, data: {}})).toEqual(passes)


    expect(validator1.validate({value: 'base', data: {base: 'base'}})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator2.validate({value: 'base', data: {base: 'base'}})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator3.validate({value: 'base', data: {base: 'base'}})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator4.validate({value: 'base', data: {base: 'base'}})).toEqual(notEqualToFieldvalidatorFails)

    expect(validator1.validate({value: 4, data: {base: '4'}})).toEqual(passes)
    expect(validator2.validate({value: 4, data: {base: '4'}})).toEqual(passes)
    expect(validator3.validate({value: 4, data: {base: '4'}})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator4.validate({value: 4, data: {base: '4'}})).toEqual(notEqualToFieldvalidatorFails)

    expect(validator1.validate({value: {}, data: {base: {}}})).toEqual(passes)
    expect(validator2.validate({value: {}, data: {base: {}}})).toEqual(passes)
    expect(validator3.validate({value: {}, data: {base: {}}})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator4.validate({value: {}, data: {base: {}}})).toEqual(notEqualToFieldvalidatorFails)

    expect(validator1.validate({value: {a: 'c'}, data: {base: {a: 'b'}}})).toEqual(passes)
    expect(validator2.validate({value: {a: 'c'}, data: {base: {a: 'b'}}})).toEqual(passes)
    expect(validator3.validate({value: {a: 'c'}, data: {base: {a: 'b'}}})).toEqual(passes)
    expect(validator4.validate({value: {a: 'c'}, data: {base: {a: 'b'}}})).toEqual(passes)

    expect(validator1.validate({value: {a: 'b'}, data: {base: {a: 'b'}}})).toEqual(passes)
    expect(validator2.validate({value: {a: 'b'}, data: {base: {a: 'b'}}})).toEqual(passes)
    expect(validator3.validate({value: {a: 'b'}, data: {base: {a: 'b'}}})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator4.validate({value: {a: 'b'}, data: {base: {a: 'b'}}})).toEqual(notEqualToFieldvalidatorFails)

    expect(validator1.validate({value: {a: 'b', x: 'y'}, data: {base: {x: 'y', a: 'b'}}})).toEqual(passes)
    expect(validator2.validate({value: {a: 'b', x: 'y'}, data: {base: {x: 'y', a: 'b'}}})).toEqual(passes)
    expect(validator3.validate({value: {a: 'b', x: 'y'}, data: {base: {x: 'y', a: 'b'}}})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator4.validate({value: {a: 'b', x: 'y'}, data: {base: {x: 'y', a: 'b'}}})).toEqual(notEqualToFieldvalidatorFails)

    expect(validator1.validate({value: {a: 'b', x: {1: 2, 3:4}}, data: {base: {a: 'b', x: {3: 4, 1: 2}}}})).toEqual(passes)
    expect(validator2.validate({value: {a: 'b', x: {1: 2, 3:4}}, data: {base: {a: 'b', x: {3: 4, 1: 2}}}})).toEqual(passes)
    expect(validator3.validate({value: {a: 'b', x: {1: 2, 3:4}}, data: {base: {a: 'b', x: {3: 4, 1: 2}}}})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator4.validate({value: {a: 'b', x: {1: 2, 3:4}}, data: {base: {a: 'b', x: {3: 4, 1: 2}}}})).toEqual(notEqualToFieldvalidatorFails)

    expect(validator1.validate({value: [1, 2, 3, 4], data: {base: [1, 2, 3]}})).toEqual(passes)
    expect(validator2.validate({value: [1, 2, 3, 4], data: {base: [1, 2, 3]}})).toEqual(passes)
    expect(validator3.validate({value: [1, 2, 3, 4], data: {base: [1, 2, 3]}})).toEqual(passes)
    expect(validator4.validate({value: [1, 2, 3, 4], data: {base: [1, 2, 3]}})).toEqual(passes)

    expect(validator1.validate({value: [1, 2, 3], data: {base: [1, 2, 3]}})).toEqual(passes)
    expect(validator2.validate({value: [1, 2, 3], data: {base: [1, 2, 3]}})).toEqual(passes)
    expect(validator3.validate({value: [1, 2, 3], data: {base: [1, 2, 3]}})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator4.validate({value: [1, 2, 3], data: {base: [1, 2, 3]}})).toEqual(notEqualToFieldvalidatorFails)

    expect(validator1.validate({value: [1, 2, 3], data: {base: [1, 2, 3]}})).toEqual(passes)
    expect(validator2.validate({value: [1, 2, 3], data: {base: [1, 2, 3]}})).toEqual(passes)
    expect(validator3.validate({value: [1, 2, 3], data: {base: [3, 1, 2]}})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator4.validate({value: [1, 2, 3], data: {base: [3, 1, 2]}})).toEqual(notEqualToFieldvalidatorFails)
  })

  it('Date validator works', async () => {
    const validator1: ValidatorStore = createFieldValidator([validDateValidator()])

    const passes: IsValid = {
      valid: true
    }

    const dateValidatorFails: IsValid = {
      message: 'Please enter a valid date!',
      error: 'INVALID_DATE',
      valid: false
    }

    const dateValidatorFailsWithEmpty: IsValid = {
      message: 'Date is required!',
      error: 'EMPTY_DATE',
      valid: false
    }

    expect(validator1.validate('2020-03-01')).toEqual(passes)
    expect(validator1.validate(new Date('2020-03-01'))).toEqual(passes)
    expect(validator1.validate({value: '2020-03-01'})).toEqual(passes)
    expect(validator1.validate({value: new Date('2020-03-01')})).toEqual(passes)
    expect(validator1.validate('2020-02-29')).toEqual(passes)
    expect(validator1.validate(new Date('2020-02-29'))).toEqual(passes)
    expect(validator1.validate({value: '2020-02-29'})).toEqual(passes)
    expect(validator1.validate({value: new Date('2020-02-29')})).toEqual(passes)
    expect(validator1.validate('2020-03-01T00:00:01Z')).toEqual(passes)
    expect(validator1.validate(new Date('2020-03-01T00:00:01Z'))).toEqual(passes)
    expect(validator1.validate({value: '2020-03-01T00:00:01Z'})).toEqual(passes)
    expect(validator1.validate({value: new Date('2020-03-01T00:00:01Z')})).toEqual(passes)

    expect(validator1.validate(2020)).toEqual(passes)
    expect(validator1.validate({value: 2020})).toEqual(passes)
    expect(validator1.validate(new Date('2020-02-30T00:00:01Z'))).toEqual(passes)
    expect(validator1.validate({value: new Date('2020-02-30T00:00:01Z')})).toEqual(passes)

    expect(validator1.validate('a')).toEqual(dateValidatorFails)
    expect(validator1.validate({value: 'a'})).toEqual(dateValidatorFails)
    expect(validator1.validate('2020-02-28T30:00:01Z')).toEqual(dateValidatorFails)
    expect(validator1.validate(new Date('2020-02-28T30:00:01Z'))).toEqual(dateValidatorFails)
    expect(validator1.validate({value: '2020-02-28T30:00:01Z'})).toEqual(dateValidatorFails)
    expect(validator1.validate({value: new Date('2020-02-28T30:00:01Z')})).toEqual(dateValidatorFails)
    expect(validator1.validate('2020-13-01T00:00:01Z')).toEqual(dateValidatorFails)
    expect(validator1.validate(new Date('2020-13-01T00:00:01Z'))).toEqual(dateValidatorFails)
    expect(validator1.validate({value: '2020-13-01T00:00:01Z'})).toEqual(dateValidatorFails)
    expect(validator1.validate({value: new Date('2020-13-01T00:00:01Z')})).toEqual(dateValidatorFails)
    expect(validator1.validate('2020-00-20T00:00:01Z')).toEqual(dateValidatorFails)
    expect(validator1.validate(new Date('2020-00-20T00:00:01Z'))).toEqual(dateValidatorFails)
    expect(validator1.validate({value: '2020-00-20T00:00:01Z'})).toEqual(dateValidatorFails)
    expect(validator1.validate({value: new Date('2020-00-20T00:00:01Z')})).toEqual(dateValidatorFails)

    expect(validator1.validate('')).toEqual(dateValidatorFailsWithEmpty)
    expect(validator1.validate({value: ''})).toEqual(dateValidatorFailsWithEmpty)
    expect(validator1.validate(null)).toEqual(dateValidatorFailsWithEmpty)
    expect(validator1.validate({value: null})).toEqual(dateValidatorFailsWithEmpty)
    expect(validator1.validate({})).toEqual(dateValidatorFailsWithEmpty)
    expect(validator1.validate([])).toEqual(dateValidatorFailsWithEmpty)
 
  })


  it('Nested validator works', async () => {
    // Use objects, so the reference stays and any change in the value is propagated to the nested validator
    let value1 ={
      value: 5
    }
    const validator1: ValidatorStore = createFieldValidator([greaterThanValidator(4)])
    const validator2: ValidatorStore = createFieldValidator([nestedValidator(validator1, value1), greaterThanValidator(7)])
    let value2 = 1

    const passes: IsValid = {
      valid: true
    }

    const greaterThanFails1: IsValid = {
      message: 'Please select a value greater than 4!',
      error: 'VALUE_IS_NOT_BIG_ENOUGH',
      valid: false
    }

    const greaterThanFails2: IsValid = {
      message: 'Please select a value greater than 7!',
      error: 'VALUE_IS_NOT_BIG_ENOUGH',
      valid: false
    }

    expect(validator1.validate(value1)).toEqual(passes)
    expect(validator2.validate({value: value1.value + value2})).toEqual(greaterThanFails2)
    expect(validator2.validate(value1.value + value2)).toEqual(greaterThanFails2)

    value2 = 6
    expect(validator1.validate(value1)).toEqual(passes)
    expect(validator2.validate({value: value1.value + value2})).toEqual(passes)
    expect(validator2.validate(value1.value + value2)).toEqual(passes)

    value1.value = 2
    //Nested validation can be skipped, In this case only those checks are run which are not nested
    //This reuses the previous validation value cached from the time value1.value was 5
    expect(validator2.validate({value: value1.value + value2, skipValidation: true})).toEqual(passes)

    //Default behaviour is on for nested reevaluation
    expect(validator2.validate({value: value1.value + value2})).toEqual(greaterThanFails1)
    expect(validator2.validate(value1.value + value2)).toEqual(greaterThanFails1)

    value1.value = 5
    expect(validator2.validate({value: value1.value + value2})).toEqual(passes)
    expect(validator2.validate(value1.value + value2)).toEqual(passes)
    //If a nested validator reruns the result is updated
    expect(validator1.result).toEqual(passes)
  })

  it('Nested validator works with svelte states', async () => {
    let state1 = $state(5),
      state2 = $state(1),
      value1 = $derived({value: state1})
    
    const validator1: ValidatorStore = createFieldValidator([greaterThanValidator(4)])
    // Unless passed as a getter, the state will not update inside the function
    const validator2: ValidatorStore = createFieldValidator([nestedValidator(validator1, () => value1), greaterThanValidator(7)])

    const passes: IsValid = {
      valid: true
    }

    const greaterThanFails1: IsValid = {
      message: 'Please select a value greater than 4!',
      error: 'VALUE_IS_NOT_BIG_ENOUGH',
      valid: false
    }

    const greaterThanFails2: IsValid = {
      message: 'Please select a value greater than 7!',
      error: 'VALUE_IS_NOT_BIG_ENOUGH',
      valid: false
    }

    expect(validator1.validate(value1)).toEqual(passes)
    expect(validator2.validate({value: value1.value + state2})).toEqual(greaterThanFails2)
    expect(validator2.validate(value1.value + state2)).toEqual(greaterThanFails2)

    state2 = 6
    expect(validator1.validate(value1)).toEqual(passes)
    expect(validator2.validate({value: value1.value + state2})).toEqual(passes)
    expect(validator2.validate(value1.value + state2)).toEqual(passes)

    state1 = 2
    //Nested validation can be skipped, In this case only those checks are run which are not nested
    //This reuses the previous validation value cached from the time value1.value was 5
    expect(validator2.validate({value: value1.value + state2, skipValidation: true})).toEqual(passes)

    //Default behaviour is on for nested reevaluation
    expect(validator2.validate({value: value1.value + state2})).toEqual(greaterThanFails1)
    expect(validator2.validate(value1.value + state2)).toEqual(greaterThanFails1)

    state1 = 8
    expect(validator2.validate({value: value1.value + state2})).toEqual(passes)
    expect(validator2.validate(value1.value + state2)).toEqual(passes)
    //If a nested validator reruns the result is updated
    expect(validator1.result).toEqual(passes)
  })
})