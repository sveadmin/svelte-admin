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
  validDateValidator
} from '../rules/index.js'

import type {
  IsValid,
  ValidatorStore,
} from '../types.js'

vi.stubEnv('TZ', 'UTC/UTC');

describe('Test date validators', () => {
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

    const dateValidatorFailsWithMonth: IsValid = {
      message: 'Month is not equal to expected value!',
      error: 'MONTH_DOES_NOT_MATCH_CRITERIA',
      valid: false,
    }

    const dateValidatorFailsWithYear: IsValid = {
      message: 'Year is not equal to expected value!',
      error: 'YEAR_DOES_NOT_MATCH_CRITERIA',
      valid: false,
    }

    expect(validator1.validate('2020-03-01')).toEqual({valid: true, validatedValue: [{'valid-date': new Date('2020-03-01').toISOString()}]})
    expect(validator1.validate(new Date('2020-03-01'))).toEqual({valid: true, validatedValue: [{'valid-date': new Date('2020-03-01').toISOString()}]})
    expect(validator1.validate({value: '2020-03-01'})).toEqual({valid: true, validatedValue: [{'valid-date': new Date('2020-03-01').toISOString()}]})
    expect(validator1.validate({value: new Date('2020-03-01')})).toEqual({valid: true, validatedValue: [{'valid-date': new Date('2020-03-01').toISOString()}]})
    expect(validator1.validate('2020-02-29')).toEqual({valid: true, validatedValue: [{'valid-date': new Date('2020-02-29').toISOString()}]})
    expect(validator1.validate(new Date('2020-02-29'))).toEqual({valid: true, validatedValue: [{'valid-date': new Date('2020-02-29').toISOString()}]})
    expect(validator1.validate({value: '2020-02-29'})).toEqual({valid: true, validatedValue: [{'valid-date': new Date('2020-02-29').toISOString()}]})
    expect(validator1.validate({value: new Date('2020-02-29')})).toEqual({valid: true, validatedValue: [{'valid-date': new Date('2020-02-29').toISOString()}]})
    expect(validator1.validate('2020-03-01T00:00:01Z')).toEqual({valid: true, validatedValue: [{'valid-date': new Date('2020-03-01T00:00:01Z').toISOString()}]})
    expect(validator1.validate(new Date('2020-03-01T00:00:01Z'))).toEqual({valid: true, validatedValue: [{'valid-date': new Date('2020-03-01T00:00:01Z').toISOString()}]})
    expect(validator1.validate({value: '2020-03-01T00:00:01Z'})).toEqual({valid: true, validatedValue: [{'valid-date': new Date('2020-03-01T00:00:01Z').toISOString()}]})
    expect(validator1.validate({value: new Date('2020-03-01T00:00:01Z')})).toEqual({valid: true, validatedValue: [{'valid-date': new Date('2020-03-01T00:00:01Z').toISOString()}]})

    expect(validator1.validate(2020)).toEqual({valid: true, validatedValue: [{'valid-date': new Date('1970-01-01T00:00:02.020Z').toISOString()}]})
    expect(validator1.validate({value: 2020})).toEqual({valid: true, validatedValue: [{'valid-date': new Date('1970-01-01T00:00:02.020Z').toISOString()}]})
    expect(validator1.validate({value: 2020, data: {datePartValidator: {year: 2020}}})).toEqual(dateValidatorFailsWithYear)
    expect(validator1.validate(new Date('2020-02-30T00:00:01Z'))).toEqual({valid: true, validatedValue: [{'valid-date': new Date('2020-02-30T00:00:01Z').toISOString()}]})
    expect(validator1.validate({value: new Date('2020-02-30T00:00:01Z')})).toEqual({valid: true, validatedValue: [{'valid-date': new Date('2020-02-30T00:00:01Z').toISOString()}]})
    expect(validator1.validate({value: new Date('2020-02-30T00:00:01Z'), data: {datePartValidator: {month: 2, day: 30}}})).toEqual(dateValidatorFailsWithMonth)

    expect(validator1.validate('2020-02-30')).toEqual({valid: true, validatedValue: [{'valid-date': new Date('2020-03-01').toISOString()}]})
    expect(validator1.validate({value: '2020-02-30'})).toEqual({valid: true, validatedValue: [{'valid-date': new Date('2020-03-01').toISOString()}]})
    expect(validator1.validate({value: '2020-02-30', data: {datePartValidator: {month: 2, day: 30}}})).toEqual(dateValidatorFailsWithMonth)

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

  it('Date validator works with runes', async () => {
    let year: number = $state(2020),
      month: number = $state(3),
      day: number = $state(1)

    let dateUTC : Date | null = $derived(new Date(year, month - 1, day)), //This works becuase timezone is stubbed to UTC
      date : Date | null = $derived(new Date(month + '/' + day + '/' + year)), 
      datePartValidator: {[key: string]: number} = $derived({year, month, day})
    const validator1: ValidatorStore = createFieldValidator([validDateValidator({datePartValidator})])
    const validator2: ValidatorStore = createFieldValidator([validDateValidator({get datePartValidator () { return datePartValidator}})])
    const validator3: ValidatorStore = createFieldValidator([validDateValidator({datePartValidator: () => datePartValidator})])

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

    const dateValidatorFailsWithDay: IsValid = {
      message: 'Day is not equal to expected value!',
      error: 'DAY_DOES_NOT_MATCH_CRITERIA',
      valid: false,
    }

    const dateValidatorFailsWithMonth: IsValid = {
      message: 'Month is not equal to expected value!',
      error: 'MONTH_DOES_NOT_MATCH_CRITERIA',
      valid: false,
    }

    const dateValidatorFailsWithYear: IsValid = {
      message: 'Year is not equal to expected value!',
      error: 'YEAR_DOES_NOT_MATCH_CRITERIA',
      valid: false,
    }

    expect(validator1.validate(date)).toEqual({valid: true, validatedValue: [{'valid-date': new Date('2020-03-01').toISOString()}]})
    expect(validator2.validate(date)).toEqual({valid: true, validatedValue: [{'valid-date': new Date('2020-03-01').toISOString()}]})
    expect(validator3.validate(date)).toEqual({valid: true, validatedValue: [{'valid-date': new Date('2020-03-01').toISOString()}]})
    expect(validator1.validate(dateUTC)).toEqual({valid: true, validatedValue: [{'valid-date': new Date('2020-03-01').toISOString()}]})
    expect(validator2.validate(dateUTC)).toEqual({valid: true, validatedValue: [{'valid-date': new Date('2020-03-01').toISOString()}]})
    expect(validator3.validate(dateUTC)).toEqual({valid: true, validatedValue: [{'valid-date': new Date('2020-03-01').toISOString()}]})
    expect(validator1.validate({value: '2020-03-02', data: {datePartValidator: {year: 2020, month: 3, day: 2}}})).toEqual({valid: true, validatedValue: [{'valid-date': new Date('2020-03-02').toISOString()}]})
    expect(validator2.validate({value: '2020-03-02', data: {datePartValidator: {year: 2020, month: 3, day: 2}}})).toEqual({valid: true, validatedValue: [{'valid-date': new Date('2020-03-02').toISOString()}]})
    expect(validator3.validate({value: '2020-03-02', data: {datePartValidator: {year: 2020, month: 3, day: 2}}})).toEqual({valid: true, validatedValue: [{'valid-date': new Date('2020-03-02').toISOString()}]})
    expect(validator1.validate('2020-03-02')).toEqual(dateValidatorFailsWithDay)
    expect(validator2.validate('2020-03-02')).toEqual(dateValidatorFailsWithDay)
    expect(validator3.validate('2020-03-02')).toEqual(dateValidatorFailsWithDay)

    month = 2
    day = 30
    expect(validator1.validate(date)).toEqual({valid: true, validatedValue: [{'valid-date': new Date('2020-03-01').toISOString()}]}) // Validation object is not changed
    expect(validator2.validate(date)).toEqual(dateValidatorFailsWithMonth)
    expect(validator3.validate(date)).toEqual(dateValidatorFailsWithMonth)
    expect(validator1.validate(dateUTC)).toEqual({valid: true, validatedValue: [{'valid-date': new Date('2020-03-01').toISOString()}]}) // Validation object is not changed
    expect(validator2.validate(dateUTC)).toEqual(dateValidatorFailsWithMonth)
    expect(validator3.validate(dateUTC)).toEqual(dateValidatorFailsWithMonth)

    month = 2
    day = 31
    expect(validator1.validate(date)).toEqual(dateValidatorFailsWithDay) // Validation object is not changed
    expect(validator2.validate(date)).toEqual(dateValidatorFailsWithMonth)
    expect(validator3.validate(date)).toEqual(dateValidatorFailsWithMonth)
    expect(validator1.validate(dateUTC)).toEqual(dateValidatorFailsWithDay) // Validation object is not changed
    expect(validator2.validate(dateUTC)).toEqual(dateValidatorFailsWithMonth)
    expect(validator3.validate(dateUTC)).toEqual(dateValidatorFailsWithMonth)

    year = 2019
    day = 29
    expect(validator1.validate(date)).toEqual(dateValidatorFailsWithYear) // Validation object is not changed
    expect(validator2.validate(date)).toEqual(dateValidatorFailsWithMonth) // 2019 is not leap year
    expect(validator3.validate(date)).toEqual(dateValidatorFailsWithMonth) // 2019 is not leap year
    expect(validator1.validate(dateUTC)).toEqual(dateValidatorFailsWithYear) // Validation object is not changed
    expect(validator2.validate(dateUTC)).toEqual(dateValidatorFailsWithMonth) // 2019 is not leap year
    expect(validator3.validate(dateUTC)).toEqual(dateValidatorFailsWithMonth) // 2019 is not leap year
    
    day = 28
    expect(validator1.validate(date)).toEqual(dateValidatorFailsWithYear) // Validation object is not changed
    expect(validator2.validate(date)).toEqual({valid: true, validatedValue: [{'valid-date': new Date('2019-02-28').toISOString()}]})
    expect(validator3.validate(date)).toEqual({valid: true, validatedValue: [{'valid-date': new Date('2019-02-28').toISOString()}]})
    expect(validator1.validate(dateUTC)).toEqual(dateValidatorFailsWithYear) // Validation object is not changed
    expect(validator2.validate(dateUTC)).toEqual({valid: true, validatedValue: [{'valid-date': new Date('2019-02-28').toISOString()}]})
    expect(validator3.validate(dateUTC)).toEqual({valid: true, validatedValue: [{'valid-date': new Date('2019-02-28').toISOString()}]})
  })
  it('Date validator works with custom error message', async () => {
    const errorMessage = 'This is a custom error message'
    const validator1: ValidatorStore = createFieldValidator([validDateValidator({errorMessage})])

    const dateValidatorFails: IsValid = {
      message: 'This is a custom error message',
      error: 'INVALID_DATE',
      valid: false
    }

    expect(validator1.validate('11111111111111111')).toEqual(dateValidatorFails)
  })
})