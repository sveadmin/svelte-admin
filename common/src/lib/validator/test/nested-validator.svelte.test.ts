import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  createFieldValidator,
} from '../index.js'

import {
  greaterThanValidator,
  hasLowercaseValidator,
  hasUppercaseValidator,
  longerThanValidator,
  nestedValidator,
  shorterThanValidator,
} from '../rules/index.js'

import type {
  IsValid,
  ValidatorStore,
} from '../types.js'


describe('Test nested validators', () => {
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

    expect(validator1.validate(value1)).toEqual({valid: true, validatedValue: [{'greater-than[4]': 5}]})
    expect(validator2.validate({value: value1.value + value2})).toEqual(greaterThanFails2)
    expect(validator2.validate(value1.value + value2)).toEqual(greaterThanFails2)

    value2 = 6
    expect(validator1.validate(value1)).toEqual({valid: true, validatedValue: [{'greater-than[4]': 5}]})
    expect(validator2.validate({value: value1.value + value2})).toEqual({valid: true, validatedValue: [[{'greater-than[4]': 5}], {'greater-than[7]': 11}]})
    expect(validator2.validate(value1.value + value2)).toEqual({valid: true, validatedValue: [[{'greater-than[4]': 5}], {'greater-than[7]': 11}]})

    value1.value = 2
    //Nested validation can be skipped, In this case only those checks are run which are not nested
    //This reuses the previous validation value cached from the time value1.value was 5
    expect(validator2.validate({value: value1.value + value2, skipValidation: true})).toEqual({valid: true, validatedValue: [[{'greater-than[4]': 5}], {'greater-than[7]': 8}]})

    //Default behaviour is on for nested reevaluation
    expect(validator2.validate({value: value1.value + value2})).toEqual(greaterThanFails1)
    expect(validator2.validate(value1.value + value2)).toEqual(greaterThanFails1)

    value1.value = 5
    expect(validator2.validate({value: value1.value + value2})).toEqual({valid: true, validatedValue: [[{'greater-than[4]': 5}], {'greater-than[7]': 11}]})
    expect(validator2.validate(value1.value + value2)).toEqual({valid: true, validatedValue: [[{'greater-than[4]': 5}], {'greater-than[7]': 11}]})
    //If a nested validator reruns the result is updated
    expect(validator1.result).toEqual({valid: true, validatedValue: [{'greater-than[4]': 5}]})
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

    expect(validator1.validate(value1)).toEqual({valid: true, validatedValue: [{'greater-than[4]': 5}]})
    expect(validator2.validate({value: value1.value + state2})).toEqual(greaterThanFails2)
    expect(validator2.validate(value1.value + state2)).toEqual(greaterThanFails2)

    state2 = 6
    expect(validator1.validate(value1)).toEqual({valid: true, validatedValue: [{'greater-than[4]': 5}]})
    expect(validator2.validate({value: value1.value + state2})).toEqual({valid: true, validatedValue: [[{'greater-than[4]': 5}], {'greater-than[7]': 11}]})
    expect(validator2.validate(value1.value + state2)).toEqual({valid: true, validatedValue: [[{'greater-than[4]': 5}], {'greater-than[7]': 11}]})

    state1 = 2
    //Nested validation can be skipped, In this case only those checks are run which are not nested
    //This reuses the previous validation value cached from the time value1.value was 5
    expect(validator2.validate({value: value1.value + state2, skipValidation: true})).toEqual({valid: true, validatedValue: [[{'greater-than[4]': 5}], {'greater-than[7]': 8}]})

    //Default behaviour is on for nested reevaluation
    expect(validator2.validate({value: value1.value + state2})).toEqual(greaterThanFails1)
    expect(validator2.validate(value1.value + state2)).toEqual(greaterThanFails1)

    state1 = 8
    expect(validator2.validate({value: value1.value + state2})).toEqual({valid: true, validatedValue: [[{'greater-than[4]': 8}], {'greater-than[7]': 14}]})
    expect(validator2.validate(value1.value + state2)).toEqual({valid: true, validatedValue: [[{'greater-than[4]': 8}], {'greater-than[7]': 14}]})
    //If a nested validator reruns the result is updated
    expect(validator1.result).toEqual({valid: true, validatedValue: [{'greater-than[4]': 8}]})
  })
  it('Nested validator can summarize already run validators', async () => {
    const validator1: ValidatorStore = createFieldValidator([greaterThanValidator({base: 4})])
    const validator2: ValidatorStore = createFieldValidator([greaterThanValidator({base: 7})])
    const validatorSum: ValidatorStore = createFieldValidator([nestedValidator(validator1), nestedValidator(validator2)])

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

    expect(validatorSum.result).toEqual({valid: true}) //By default all checks return true

    validator1.validate(5)
    validator2.validate(6)
    expect(validatorSum.result).toEqual({valid: true}) //Without validation on the sum the value is not udpated

    validatorSum.validate()
    expect(validatorSum.result).toEqual(greaterThanFails2)
    
    validator2.validate(9)
    validatorSum.validate()
    expect(validatorSum.result).toEqual({valid: true, validatedValue:[[{"greater-than[4]": 5}],[{"greater-than[7]": 9}]]})

    validator1.validate(3)
    expect(validatorSum.result).toEqual({valid: true, validatedValue:[[{"greater-than[4]": 5}],[{"greater-than[7]": 9}]]}) //validator1 result is still cached in the summary
    
    validatorSum.validate()
    expect(validatorSum.result).toEqual(greaterThanFails1)

    validator1.validate(15)
    validator2.validate(11)
    validatorSum.validate()
    expect(validatorSum.result).toEqual({valid: true, validatedValue:[[{"greater-than[4]": 15}],[{"greater-than[7]": 11}]]}) //validator1 result is still cached in the summary
  })
  it('Nested validator run with multiple validators at each nested level', async () => {
    const validator1: ValidatorStore = createFieldValidator([hasLowercaseValidator(), shorterThanValidator({base: 5})])
    const validator2: ValidatorStore = createFieldValidator([hasUppercaseValidator(), longerThanValidator({base: 2})])
    const validatorSum: ValidatorStore = createFieldValidator([nestedValidator(validator1), nestedValidator(validator2)])

    const shorterThanFails1: IsValid = {
      error: 'VALUE_IS_NOT_SHORT_ENOUGH',
      message: 'Please enter a value shorter than 5 characters!',
      valid: false,
    }

    const hasUpperCaseFails: IsValid = {
      message: 'Please enter a value which has at least one upper case letter!',
      error: 'VALUE_DOES_NOT_HAVE_UPPERCASE',
      valid: false
    }

    expect(validatorSum.result).toEqual({valid: true}) //By default all checks return true

    validator1.validate('aaaaaa')
    validator2.validate('AAA')
    expect(validatorSum.result).toEqual({valid: true}) //Without validation on the sum the value is not udpated

    validatorSum.validate()
    expect(validatorSum.result).toEqual(shorterThanFails1) 

    validator1.validate('aaa')
    validator2.validate('aaaaaaaaaaa')
    validatorSum.validate()
    expect(validatorSum.result).toEqual(hasUpperCaseFails) 
  })
})