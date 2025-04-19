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
  it('Allowed list validator works', async () => {
    const allowedList = {
      'allowed': true
    }

    //Object match needs to be JSON.stringified as key
    const allowedObjectList = {
      '{"allowed":true}': true
    }

    const getAllowedList = () => allowedList

    const validator1: ValidatorStore = createFieldValidator([allowedListValidator({lookupTable: allowedList})])
    const validator2: ValidatorStore = createFieldValidator([allowedListValidator({lookupTable: getAllowedList})])
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

  it('Blocked list validator works', async () => {
    const blockedList = {
      'not-allowed': true
    }

    const getBlockedList = () => blockedList

    const validator1: ValidatorStore = createFieldValidator([blockedListValidator({lookupTable: blockedList})])
    const validator2: ValidatorStore = createFieldValidator([blockedListValidator({lookupTable: getBlockedList})])

    const blockedListFails: IsValid = {
      message: 'Please select a different value, this is not allowed! [not-allowed]',
      error: 'VALUE_BLOCKED',
      valid: false
    }

    expect(validator1.validate('allowed')).toEqual({valid: true, validatedValue: ['allowed']})
    expect(validator2.validate('allowed')).toEqual({valid: true, validatedValue: ['allowed']})
    expect(validator1.validate({value: 'allowed'})).toEqual({valid: true, validatedValue: ['allowed']})
    expect(validator2.validate({value: 'allowed'})).toEqual({valid: true, validatedValue: ['allowed']})
    expect(validator1.validate(null)).toEqual({valid: true, validatedValue: []}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate(null)).toEqual({valid: true, validatedValue: []}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate({value: null})).toEqual({valid: true, validatedValue: []}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate({value: null})).toEqual({valid: true, validatedValue: []}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate('')).toEqual({valid: true, validatedValue: []}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate('')).toEqual({valid: true, validatedValue: []}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate({value: ''})).toEqual({valid: true, validatedValue: []}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate({value: ''})).toEqual({valid: true, validatedValue: []}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate({})).toEqual({valid: true, validatedValue: [{}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate({})).toEqual({valid: true, validatedValue: [{}]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate([])).toEqual({valid: true, validatedValue: [[]]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator2.validate([])).toEqual({valid: true, validatedValue: [[]]}) // To handle cases where empty value is not allowed, add a required validator prior to this check
    expect(validator1.validate('not-allowed')).toEqual(blockedListFails)
    expect(validator2.validate('not-allowed')).toEqual(blockedListFails)
    expect(validator1.validate({value: 'not-allowed'})).toEqual(blockedListFails)
    expect(validator2.validate({value: 'not-allowed'})).toEqual(blockedListFails)
  })

  it('Email validator works', async () => {
    const validator1: ValidatorStore = createFieldValidator([emailValidator()])

    const emailFails: IsValid = {
      message: 'Please enter a valid email!',
      error: 'INVALID_EMAIL',
      valid: false
    }

    expect(validator1.validate('a@b.com')).toEqual({valid: true, validatedValue: ['a@b.com']})
    expect(validator1.validate({value: 'a@b.com'})).toEqual({valid: true, validatedValue: ['a@b.com']})
    expect(validator1.validate('a+test@b.com')).toEqual({valid: true, validatedValue: ['a+test@b.com']})
    expect(validator1.validate({value: 'a+test@b.com'})).toEqual({valid: true, validatedValue: ['a+test@b.com']})
    expect(validator1.validate('a@b.com.bo')).toEqual({valid: true, validatedValue: ['a@b.com.bo']})
    expect(validator1.validate({value: 'a@b.com.bo'})).toEqual({valid: true, validatedValue: ['a@b.com.bo']})
    expect(validator1.validate('a@b.co.ke')).toEqual({valid: true, validatedValue: ['a@b.co.ke']})
    expect(validator1.validate({value: 'a@b.co.ke'})).toEqual({valid: true, validatedValue: ['a@b.co.ke']})
    expect(validator1.validate('a[at]b.com')).toEqual(emailFails)
    expect(validator1.validate({value: 'a[at]b.com'})).toEqual(emailFails)
    expect(validator1.validate('this is not an email')).toEqual(emailFails)
    expect(validator1.validate({value: 'this is not an email'})).toEqual(emailFails)
    expect(validator1.validate(null)).toEqual(emailFails)
    expect(validator1.validate({value: null})).toEqual(emailFails)
  })

  it('Has member validator works', async () => {
    const validator1: ValidatorStore = createFieldValidator([hasMemberValidator()])

    const hasMemberFails: IsValid = {
      message: 'At least one member is required!',
      error: 'LIST_IS_EMPTY',
      valid: false
    }

    expect(validator1.validate([1])).toEqual({valid: true, validatedValue: [[1]]})
    expect(validator1.validate({value: [1]})).toEqual({valid: true, validatedValue: [[1]]})
    expect(validator1.validate(['a'])).toEqual({valid: true, validatedValue: [['a']]})
    expect(validator1.validate({value: ['a']})).toEqual({valid: true, validatedValue: [['a']]})
    expect(validator1.validate({a: 1})).toEqual({valid: true, validatedValue: [{a:1}]})
    expect(validator1.validate({value: {a: 1}})).toEqual({valid: true, validatedValue: [{a:1}]})
    expect(validator1.validate({a: 'b'})).toEqual({valid: true, validatedValue: [{a:'b'}]})
    expect(validator1.validate({value: {a: 'b'}})).toEqual({valid: true, validatedValue: [{a:'b'}]})
    expect(validator1.validate('a')).toEqual({valid: true, validatedValue: ['a']}) //String is treated as array here
    expect(validator1.validate({value: 'a'})).toEqual({valid: true, validatedValue: ['a']}) //String is treated as array here
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
    const validator1: ValidatorStore = createFieldValidator([lessThanValidator({base: 5})])
    const validator2: ValidatorStore = createFieldValidator([lessThanValidator({base: () => 5})])
    const validator3: ValidatorStore = createFieldValidator([lessThanValidator({base: new Date('2020-03-01')})])
    const validator4: ValidatorStore = createFieldValidator([lessThanValidator({base: () => new Date('2020-03-01')})])

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
    expect(validator1.validate(4)).toEqual({valid: true, validatedValue: [4]})
    expect(validator2.validate(4)).toEqual({valid: true, validatedValue: [4]})
    expect(validator1.validate({value: 4})).toEqual({valid: true, validatedValue: [4]})
    expect(validator2.validate({value: 4})).toEqual({valid: true, validatedValue: [4]})

    expect(validator3.validate('2020-02-29')).toEqual({valid: true, validatedValue: [new Date('2020-02-29')]})
    expect(validator3.validate(new Date('2020-02-29'))).toEqual({valid: true, validatedValue: [new Date('2020-02-29')]})
    expect(validator3.validate({value: '2020-02-29'})).toEqual({valid: true, validatedValue: [new Date('2020-02-29')]})
    expect(validator3.validate({value: new Date('2020-02-29')})).toEqual({valid: true, validatedValue: [new Date('2020-02-29')]})
    expect(validator4.validate('2020-02-29')).toEqual({valid: true, validatedValue: [new Date('2020-02-29')]})
    expect(validator4.validate(new Date('2020-02-29'))).toEqual({valid: true, validatedValue: [new Date('2020-02-29')]})
    expect(validator4.validate({value: '2020-02-29'})).toEqual({valid: true, validatedValue: [new Date('2020-02-29')]})
    expect(validator4.validate({value: new Date('2020-02-29')})).toEqual({valid: true, validatedValue: [new Date('2020-02-29')]})

    expect(validator3.validate('2020-03-01T00:00:01+09:00')).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:01+09:00')]})
    expect(validator3.validate(new Date('2020-03-01T00:00:01+09:00'))).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:01+09:00')]})
    expect(validator3.validate({value: '2020-03-01T00:00:01+09:00'})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:01+09:00')]})
    expect(validator3.validate({value: new Date('2020-03-01T00:00:01+09:00')})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:01+09:00')]})
    expect(validator4.validate('2020-03-01T00:00:01+09:00')).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:01+09:00')]})
    expect(validator4.validate(new Date('2020-03-01T00:00:01+09:00'))).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:01+09:00')]})
    expect(validator4.validate({value: '2020-03-01T00:00:01+09:00'})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:01+09:00')]})
    expect(validator4.validate({value: new Date('2020-03-01T00:00:01+09:00')})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:01+09:00')]})

    expect(validator3.validate('2020-02-29T23:59:59Z')).toEqual({valid: true, validatedValue: [new Date('2020-02-29T23:59:59Z')]})
    expect(validator3.validate(new Date('2020-02-29T23:59:59Z'))).toEqual({valid: true, validatedValue: [new Date('2020-02-29T23:59:59Z')]})
    expect(validator3.validate({value: '2020-02-29T23:59:59Z'})).toEqual({valid: true, validatedValue: [new Date('2020-02-29T23:59:59Z')]})
    expect(validator3.validate({value: new Date('2020-02-29T23:59:59Z')})).toEqual({valid: true, validatedValue: [new Date('2020-02-29T23:59:59Z')]})
    expect(validator4.validate('2020-02-29T23:59:59Z')).toEqual({valid: true, validatedValue: [new Date('2020-02-29T23:59:59Z')]})
    expect(validator4.validate(new Date('2020-02-29T23:59:59Z'))).toEqual({valid: true, validatedValue: [new Date('2020-02-29T23:59:59Z')]})
    expect(validator4.validate({value: '2020-02-29T23:59:59Z'})).toEqual({valid: true, validatedValue: [new Date('2020-02-29T23:59:59Z')]})
    expect(validator4.validate({value: new Date('2020-02-29T23:59:59Z')})).toEqual({valid: true, validatedValue: [new Date('2020-02-29T23:59:59Z')]})

    expect(validator3.validate('2020-02-30')).toEqual(lesshanFailsForDate)
    expect(validator3.validate(new Date('2020-02-30'))).toEqual(lesshanFailsForDate)
    expect(validator3.validate({value: '2020-02-30'})).toEqual(lesshanFailsForDate)
    expect(validator3.validate({value: new Date('2020-02-30')})).toEqual(lesshanFailsForDate)
    expect(validator4.validate('2020-02-30')).toEqual(lesshanFailsForDate)
    expect(validator4.validate(new Date('2020-02-30'))).toEqual(lesshanFailsForDate)
    expect(validator4.validate({value: '2020-02-30'})).toEqual(lesshanFailsForDate)
    expect(validator4.validate({value: new Date('2020-02-30')})).toEqual(lesshanFailsForDate)

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
    const validator1: ValidatorStore = createFieldValidator([notEqualToFieldValidator({fieldName: 'base'})])
    const validator2: ValidatorStore = createFieldValidator([notEqualToFieldValidator({fieldName: 'base', ignoreEmpty: true})])
    const validator3: ValidatorStore = createFieldValidator([notEqualToFieldValidator({fieldName: 'base', ignoreEmpty: false, strictComparison: true})])
    const validator4: ValidatorStore = createFieldValidator([notEqualToFieldValidator({fieldName: 'base', ignoreEmpty: true, strictComparison: true})])

    const notEqualToFieldvalidatorFails: IsValid = {
      message: 'Please select a different value, this matches the value of field `base`!',
      error: 'VALUE_MATCHES_BLACKLISTED_COLUMN',
      valid: false
    }

    expect(validator1.validate({value: 'different', data: {dataSet: {base: 'base'}}})).toEqual({valid: true, validatedValue: ['different']})
    expect(validator2.validate({value: 'different', data: {dataSet: {base: 'base'}}})).toEqual({valid: true, validatedValue: ['different']})
    expect(validator3.validate({value: 'different', data: {dataSet: {base: 'base'}}})).toEqual({valid: true, validatedValue: ['different']})
    expect(validator4.validate({value: 'different', data: {dataSet: {base: 'base'}}})).toEqual({valid: true, validatedValue: ['different']})

    expect(validator1.validate({value: null, data: {dataSet: {base: null}}})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator2.validate({value: null, data: {dataSet: {base: null}}})).toEqual({valid: true, validatedValue: []})
    expect(validator3.validate({value: null, data: {dataSet: {base: null}}})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator4.validate({value: null, data: {dataSet: {base: null}}})).toEqual({valid: true, validatedValue: []})

    expect(validator1.validate({value: undefined})).toEqual({valid: true, validatedValue: []})
    expect(validator2.validate({value: undefined})).toEqual({valid: true, validatedValue: []})
    expect(validator3.validate({value: undefined})).toEqual({valid: true, validatedValue: []})
    expect(validator4.validate({value: undefined})).toEqual({valid: true, validatedValue: []})

    expect(validator1.validate({value: undefined, data: {dataSet: {}}})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator2.validate({value: undefined, data: {dataSet: {}}})).toEqual({valid: true, validatedValue: []})
    expect(validator3.validate({value: undefined, data: {dataSet: {}}})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator4.validate({value: undefined, data: {dataSet: {}}})).toEqual({valid: true, validatedValue: []})


    expect(validator1.validate({value: 'base', data: {dataSet: {base: 'base'}}})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator2.validate({value: 'base', data: {dataSet: {base: 'base'}}})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator3.validate({value: 'base', data: {dataSet: {base: 'base'}}})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator4.validate({value: 'base', data: {dataSet: {base: 'base'}}})).toEqual(notEqualToFieldvalidatorFails)

    expect(validator1.validate({value: 4, data: {dataSet: {base: '4'}}})).toEqual({valid: true, validatedValue: [4]})
    expect(validator2.validate({value: 4, data: {dataSet: {base: '4'}}})).toEqual({valid: true, validatedValue: [4]})
    expect(validator3.validate({value: 4, data: {dataSet: {base: '4'}}})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator4.validate({value: 4, data: {dataSet: {base: '4'}}})).toEqual(notEqualToFieldvalidatorFails)

    expect(validator1.validate({value: {}, data: {dataSet: {base: {}}}})).toEqual({valid: true, validatedValue: [{}]})
    expect(validator2.validate({value: {}, data: {dataSet: {base: {}}}})).toEqual({valid: true, validatedValue: [{}]})
    expect(validator3.validate({value: {}, data: {dataSet: {base: {}}}})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator4.validate({value: {}, data: {dataSet: {base: {}}}})).toEqual(notEqualToFieldvalidatorFails)

    expect(validator1.validate({value: {a: 'c'}, data: {dataSet: {base: {a: 'b'}}}})).toEqual({valid: true, validatedValue: [{a: 'c'}]})
    expect(validator2.validate({value: {a: 'c'}, data: {dataSet: {base: {a: 'b'}}}})).toEqual({valid: true, validatedValue: [{a: 'c'}]})
    expect(validator3.validate({value: {a: 'c'}, data: {dataSet: {base: {a: 'b'}}}})).toEqual({valid: true, validatedValue: [{a: 'c'}]})
    expect(validator4.validate({value: {a: 'c'}, data: {dataSet: {base: {a: 'b'}}}})).toEqual({valid: true, validatedValue: [{a: 'c'}]})

    expect(validator1.validate({value: {a: 'b'}, data: {dataSet: {base: {a: 'b'}}}})).toEqual({valid: true, validatedValue: [{a: 'b'}]})
    expect(validator2.validate({value: {a: 'b'}, data: {dataSet: {base: {a: 'b'}}}})).toEqual({valid: true, validatedValue: [{a: 'b'}]})
    expect(validator3.validate({value: {a: 'b'}, data: {dataSet: {base: {a: 'b'}}}})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator4.validate({value: {a: 'b'}, data: {dataSet: {base: {a: 'b'}}}})).toEqual(notEqualToFieldvalidatorFails)

    expect(validator1.validate({value: {a: 'b', x: 'y'}, data: {dataSet: {base: {x: 'y', a: 'b'}}}})).toEqual({valid: true, validatedValue: [{a: 'b', x: 'y'}]})
    expect(validator2.validate({value: {a: 'b', x: 'y'}, data: {dataSet: {base: {x: 'y', a: 'b'}}}})).toEqual({valid: true, validatedValue: [{a: 'b', x: 'y'}]})
    expect(validator3.validate({value: {a: 'b', x: 'y'}, data: {dataSet: {base: {x: 'y', a: 'b'}}}})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator4.validate({value: {a: 'b', x: 'y'}, data: {dataSet: {base: {x: 'y', a: 'b'}}}})).toEqual(notEqualToFieldvalidatorFails)

    expect(validator1.validate({value: {a: 'b', x: {1: 2, 3:4}}, data: {dataSet: {base: {a: 'b', x: {3: 4, 1: 2}}}}})).toEqual({valid: true, validatedValue: [{a: 'b', x: {1: 2, 3:4}}]})
    expect(validator2.validate({value: {a: 'b', x: {1: 2, 3:4}}, data: {dataSet: {base: {a: 'b', x: {3: 4, 1: 2}}}}})).toEqual({valid: true, validatedValue: [{a: 'b', x: {1: 2, 3:4}}]})
    expect(validator3.validate({value: {a: 'b', x: {1: 2, 3:4}}, data: {dataSet: {base: {a: 'b', x: {3: 4, 1: 2}}}}})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator4.validate({value: {a: 'b', x: {1: 2, 3:4}}, data: {dataSet: {base: {a: 'b', x: {3: 4, 1: 2}}}}})).toEqual(notEqualToFieldvalidatorFails)

    expect(validator1.validate({value: [1, 2, 3, 4], data: {dataSet: {base: [1, 2, 3]}}})).toEqual({valid: true, validatedValue: [[1, 2, 3, 4]]})
    expect(validator2.validate({value: [1, 2, 3, 4], data: {dataSet: {base: [1, 2, 3]}}})).toEqual({valid: true, validatedValue: [[1, 2, 3, 4]]})
    expect(validator3.validate({value: [1, 2, 3, 4], data: {dataSet: {base: [1, 2, 3]}}})).toEqual({valid: true, validatedValue: [[1, 2, 3, 4]]})
    expect(validator4.validate({value: [1, 2, 3, 4], data: {dataSet: {base: [1, 2, 3]}}})).toEqual({valid: true, validatedValue: [[1, 2, 3, 4]]})

    expect(validator1.validate({value: [1, 2, 3], data: {dataSet: {base: [1, 2, 3]}}})).toEqual({valid: true, validatedValue: [[1, 2, 3]]})
    expect(validator2.validate({value: [1, 2, 3], data: {dataSet: {base: [1, 2, 3]}}})).toEqual({valid: true, validatedValue: [[1, 2, 3]]})
    expect(validator3.validate({value: [1, 2, 3], data: {dataSet: {base: [1, 2, 3]}}})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator4.validate({value: [1, 2, 3], data: {dataSet: {base: [1, 2, 3]}}})).toEqual(notEqualToFieldvalidatorFails)

    expect(validator1.validate({value: [1, 2, 3], data: {dataSet: {base: [1, 2, 3]}}})).toEqual({valid: true, validatedValue: [[1, 2, 3]]})
    expect(validator2.validate({value: [1, 2, 3], data: {dataSet: {base: [1, 2, 3]}}})).toEqual({valid: true, validatedValue: [[1, 2, 3]]})
    expect(validator3.validate({value: [1, 2, 3], data: {dataSet: {base: [3, 1, 2]}}})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator4.validate({value: [1, 2, 3], data: {dataSet: {base: [3, 1, 2]}}})).toEqual(notEqualToFieldvalidatorFails)
  })

  it('Date validator works', async () => {
    const validator1: ValidatorStore = createFieldValidator([validDateValidator()])

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

    expect(validator1.validate('2020-03-01')).toEqual({valid: true, validatedValue: [new Date('2020-03-01')]})
    expect(validator1.validate(new Date('2020-03-01'))).toEqual({valid: true, validatedValue: [new Date('2020-03-01')]})
    expect(validator1.validate({value: '2020-03-01'})).toEqual({valid: true, validatedValue: [new Date('2020-03-01')]})
    expect(validator1.validate({value: new Date('2020-03-01')})).toEqual({valid: true, validatedValue: [new Date('2020-03-01')]})
    expect(validator1.validate('2020-02-29')).toEqual({valid: true, validatedValue: [new Date('2020-02-29')]})
    expect(validator1.validate(new Date('2020-02-29'))).toEqual({valid: true, validatedValue: [new Date('2020-02-29')]})
    expect(validator1.validate({value: '2020-02-29'})).toEqual({valid: true, validatedValue: [new Date('2020-02-29')]})
    expect(validator1.validate({value: new Date('2020-02-29')})).toEqual({valid: true, validatedValue: [new Date('2020-02-29')]})
    expect(validator1.validate('2020-03-01T00:00:01Z')).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:01Z')]})
    expect(validator1.validate(new Date('2020-03-01T00:00:01Z'))).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:01Z')]})
    expect(validator1.validate({value: '2020-03-01T00:00:01Z'})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:01Z')]})
    expect(validator1.validate({value: new Date('2020-03-01T00:00:01Z')})).toEqual({valid: true, validatedValue: [new Date('2020-03-01T00:00:01Z')]})

    expect(validator1.validate(2020)).toEqual({valid: true, validatedValue: [new Date('1970-01-01T00:00:02.020Z')]})
    expect(validator1.validate({value: 2020})).toEqual({valid: true, validatedValue: [new Date('1970-01-01T00:00:02.020Z')]})
    expect(validator1.validate(new Date('2020-02-30T00:00:01Z'))).toEqual({valid: true, validatedValue: [new Date('2020-02-30T00:00:01Z')]})
    expect(validator1.validate({value: new Date('2020-02-30T00:00:01Z')})).toEqual({valid: true, validatedValue: [new Date('2020-02-30T00:00:01Z')]})

    expect(validator1.validate('2020-02-30')).toEqual({valid: true, validatedValue: [new Date('2020-03-01')]})
    expect(validator1.validate({value: '2020-02-30'})).toEqual({valid: true, validatedValue: [new Date('2020-03-01')]})

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
    const validator1: ValidatorStore = createFieldValidator([greaterThanValidator({base: 4})])
    const validator2: ValidatorStore = createFieldValidator([nestedValidator(validator1, value1), greaterThanValidator({base: 7})])
    let value2 = 1

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

    expect(validator1.validate(value1)).toEqual({valid: true, validatedValue: [5]})
    expect(validator2.validate({value: value1.value + value2})).toEqual(greaterThanFails2)
    expect(validator2.validate(value1.value + value2)).toEqual(greaterThanFails2)

    value2 = 6
    expect(validator1.validate(value1)).toEqual({valid: true, validatedValue: [5]})
    expect(validator2.validate({value: value1.value + value2})).toEqual({valid: true, validatedValue: [[5], 11]})
    expect(validator2.validate(value1.value + value2)).toEqual({valid: true, validatedValue: [[5], 11]})

    value1.value = 2
    //Nested validation can be skipped, In this case only those checks are run which are not nested
    //This reuses the previous validation value cached from the time value1.value was 5
    expect(validator2.validate({value: value1.value + value2, skipValidation: true})).toEqual({valid: true, validatedValue: [[5], 8]})

    //Default behaviour is on for nested reevaluation
    expect(validator2.validate({value: value1.value + value2})).toEqual(greaterThanFails1)
    expect(validator2.validate(value1.value + value2)).toEqual(greaterThanFails1)

    value1.value = 5
    expect(validator2.validate({value: value1.value + value2})).toEqual({valid: true, validatedValue: [[5], 11]})
    expect(validator2.validate(value1.value + value2)).toEqual({valid: true, validatedValue: [[5], 11]})
    //If a nested validator reruns the result is updated
    expect(validator1.result).toEqual({valid: true, validatedValue: [5]})
  })

  it('Nested validator works with svelte states', async () => {
    let state1 = $state(5),
      state2 = $state(1),
      value1 = $derived({value: state1})
    
    const validator1: ValidatorStore = createFieldValidator([greaterThanValidator({base: 4})])
    // Unless passed as a getter, the state will not update inside the function
    const validator2: ValidatorStore = createFieldValidator([nestedValidator(validator1, () => value1), greaterThanValidator({base: 7})])

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

    expect(validator1.validate(value1)).toEqual({valid: true, validatedValue: [5]})
    expect(validator2.validate({value: value1.value + state2})).toEqual(greaterThanFails2)
    expect(validator2.validate(value1.value + state2)).toEqual(greaterThanFails2)

    state2 = 6
    expect(validator1.validate(value1)).toEqual({valid: true, validatedValue: [5]})
    expect(validator2.validate({value: value1.value + state2})).toEqual({valid: true, validatedValue: [[5], 11]})
    expect(validator2.validate(value1.value + state2)).toEqual({valid: true, validatedValue: [[5], 11]})

    state1 = 2
    //Nested validation can be skipped, In this case only those checks are run which are not nested
    //This reuses the previous validation value cached from the time value1.value was 5
    expect(validator2.validate({value: value1.value + state2, skipValidation: true})).toEqual({valid: true, validatedValue: [[5], 8]})

    //Default behaviour is on for nested reevaluation
    expect(validator2.validate({value: value1.value + state2})).toEqual(greaterThanFails1)
    expect(validator2.validate(value1.value + state2)).toEqual(greaterThanFails1)

    state1 = 8
    expect(validator2.validate({value: value1.value + state2})).toEqual({valid: true, validatedValue: [[8], 14]})
    expect(validator2.validate(value1.value + state2)).toEqual({valid: true, validatedValue: [[8], 14]})
    //If a nested validator reruns the result is updated
    expect(validator1.result).toEqual({valid: true, validatedValue: [8]})
  })
})