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
  blockedListValidator,
  equalLengthValidator,
  hasLowercaseValidator,
  hasMemberValidator,
  hasUppercaseValidator,
  regexValidator,
} from '../rules/index.js'

import type {
  IsValid,
  ValidatorStore,
} from '../types.js'

describe('Test validators can be chained with or', () => {
  it('Regex validators can be chained with or', async () => {
    const validator: ValidatorStore = createFieldValidator([
      regexValidator({
        orValidators: [
          regexValidator({
            orValidators: [regexValidator({pattern :'[m-p]+'})],
            pattern :'[g-k]+',
          })
        ],
        pattern :'[a-c]+'
      })
    ])

    const fullFail: IsValid = {
      message: 'Please select a different value, this does not match the required pattern! /[a-c]+/ OR Please select a different value, this does not match the required pattern! /[g-k]+/ OR Please select a different value, this does not match the required pattern! /[m-p]+/',
      error: 'VALUE_DOES_NOT_MATCH_PATTERN, VALUE_DOES_NOT_MATCH_PATTERN, VALUE_DOES_NOT_MATCH_PATTERN',
      valid: false
    }

    expect(validator.validate('abcabc')).toEqual({valid: true, validatedValue: [{'regex[/[a-c]+/]':'abcabc'}]})
    expect(validator.validate('ghijk')).toEqual({valid: true, validatedValue: [[{'regex[/[g-k]+/]':'ghijk'}]]})
    expect(validator.validate('mopmop')).toEqual({valid: true, validatedValue: [[[{'regex[/[m-p]+/]':'mopmop'}]]]})
    expect(validator.validate('def')).toEqual(fullFail)
    expect(validator.validate('defg')).toEqual({valid: true, validatedValue: [[{'regex[/[g-k]+/]':'defg'}]]})
  })

  it('Mixing and and or validator chaining', async () => {
    const validator: ValidatorStore = createFieldValidator([
      regexValidator({
        orValidators: [
          regexValidator({
            pattern :'[g-m]+',
          }),
          regexValidator({
            pattern :'[k-p]+',
          })
        ],
        pattern :'[a-c]+'
      })
    ])

    const fail1: IsValid = {
      message: 'Please select a different value, this does not match the required pattern! /[a-c]+/ OR Please select a different value, this does not match the required pattern! /[g-m]+/',
      error: 'VALUE_DOES_NOT_MATCH_PATTERN, VALUE_DOES_NOT_MATCH_PATTERN',
      valid: false
    }

    const fail2: IsValid = {
      message: 'Please select a different value, this does not match the required pattern! /[a-c]+/ OR Please select a different value, this does not match the required pattern! /[k-p]+/',
      error: 'VALUE_DOES_NOT_MATCH_PATTERN, VALUE_DOES_NOT_MATCH_PATTERN',
      valid: false
    }

    expect(validator.validate('abcabc')).toEqual({valid: true, validatedValue: [{'regex[/[a-c]+/]':'abcabc'}]})
    expect(validator.validate('ghijk')).toEqual({valid: true, validatedValue: [[{'regex[/[g-m]+/]':'ghijk'}, {'regex[/[k-p]+/]':'ghijk'}]]})
    expect(validator.validate('mopmop')).toEqual({valid: true, validatedValue: [[{'regex[/[g-m]+/]':'mopmop'}, {'regex[/[k-p]+/]':'mopmop'}]]})
    expect(validator.validate('def')).toEqual(fail1)
    expect(validator.validate('defg')).toEqual(fail2)
  })

  it('Allowed list validators can be chained with or', async () => {
    const validator: ValidatorStore = createFieldValidator([
      allowedListValidator({
        orValidators: [
          allowedListValidator({
            orValidators: [allowedListValidator({lookupTable :{M: 1}})],
            lookupTable :{G: 1},
          })
        ],
        lookupTable :{A: 1}
      })
    ])

    const fullFail: IsValid = {
      message: 'Please select a value from the list of allowed ones! [A] OR Please select a value from the list of allowed ones! [G] OR Please select a value from the list of allowed ones! [M]',
      error: 'VALUE_NOT_ALLOWED, VALUE_NOT_ALLOWED, VALUE_NOT_ALLOWED',
      valid: false
    }

    expect(validator.validate('A')).toEqual({valid: true, validatedValue: [{'allowed-list':'A'}]})
    expect(validator.validate('G')).toEqual({valid: true, validatedValue: [[{'allowed-list':'G'}]]})
    expect(validator.validate('M')).toEqual({valid: true, validatedValue: [[[{'allowed-list':'M'}]]]})
    expect(validator.validate('Z')).toEqual(fullFail)
  })

  it('Blocked list validators can be chained with or', async () => {
    const validator: ValidatorStore = createFieldValidator([
      blockedListValidator({
        orValidators: [
          blockedListValidator({
            orValidators: [blockedListValidator({lookupTable :{M: 1, Z: 1}})],
            lookupTable :{G: 1, Z: 1},
          })
        ],
        lookupTable :{A: 1, Z: 1}
      })
    ])

    const fullFail: IsValid = {
      message: 'Please select a different value, this is not allowed! [A, Z] OR Please select a different value, this is not allowed! [G, Z] OR Please select a different value, this is not allowed! [M, Z]',
      error: 'VALUE_BLOCKED, VALUE_BLOCKED, VALUE_BLOCKED',
      valid: false
    }

    expect(validator.validate('A')).toEqual({valid: true, validatedValue: [[{'blocked-list':'A'}]]})
    expect(validator.validate('G')).toEqual({valid: true, validatedValue: [{'blocked-list':'G'}]})
    expect(validator.validate('M')).toEqual({valid: true, validatedValue: [{'blocked-list':'M'}]})
    expect(validator.validate('Z')).toEqual(fullFail)
  })

  it('Equal length validators can be chained with or', async () => {
    const validator: ValidatorStore = createFieldValidator([
      equalLengthValidator({
        base: 2,
        orValidators: [
          equalLengthValidator({
            base: 4,
            orValidators: [equalLengthValidator({base : 6})],
          })
        ],
      })
    ])

    const fullFail: IsValid = {
      message: 'Please enter a value with a length of 2 characters! OR Please enter a value with a length of 4 characters! OR Please enter a value with a length of 6 characters!',
      error: 'VALUE_HAS_TO_MATCH_LENGTH, VALUE_HAS_TO_MATCH_LENGTH, VALUE_HAS_TO_MATCH_LENGTH',
      valid: false
    }

    expect(validator.validate('12')).toEqual({valid: true, validatedValue: [{'equal-length[2]':'12'}]})
    expect(validator.validate('1234')).toEqual({valid: true, validatedValue: [[{'equal-length[4]':'1234'}]]})
    expect(validator.validate('123456')).toEqual({valid: true, validatedValue: [[[{'equal-length[6]':'123456'}]]]})
    expect(validator.validate('1')).toEqual(fullFail)
  })

  it.only('Case check validators can be chained with or', async () => {
    const validator: ValidatorStore = createFieldValidator([
      hasLowercaseValidator({
        orValidators: [
          hasUppercaseValidator({
          })
        ],
      })
    ])

    expect(validator.validate('aaa')).toEqual({valid: true, validatedValue: [{'has-lowercase':'aaa'}]})
    expect(validator.validate('BBB')).toEqual({valid: true, validatedValue: [[{'has-uppercase':'BBB'}]]})
    expect(validator.validate('aBaBaB')).toEqual({valid: true, validatedValue: [{'has-lowercase':'aBaBaB'}]})
  })
})