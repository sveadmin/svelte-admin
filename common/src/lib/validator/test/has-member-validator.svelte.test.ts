import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  createFieldValidator,
} from '../index.js'

import {
  hasMemberValidator,
} from '../rules/index.js'

import type {
  IsValid,
  ValidatorStore,
} from '../types.js'


describe('Test has member validators', () => {
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

  it('Has member validator works with runes', async () => {
    let data : any = $state({a: 1})
    const validator1: ValidatorStore = createFieldValidator([hasMemberValidator({valueFallback: data })])
    const validator2: ValidatorStore = createFieldValidator([hasMemberValidator({get valueFallback () { return data }})])
    const validator3: ValidatorStore = createFieldValidator([hasMemberValidator({valueFallback: () => data})])

    const hasMemberFails: IsValid = {
      message: 'At least one member is required!',
      error: 'LIST_IS_EMPTY',
      valid: false
    }

    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{a:1}]})
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{a:1}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{a:1}]})
    expect(validator1.validate({data: {valueFallback: {a: 2}}})).toEqual({valid: true, validatedValue: [{a:2}]})
    expect(validator2.validate({data: {valueFallback: {a: 2}}})).toEqual({valid: true, validatedValue: [{a:2}]})
    expect(validator3.validate({data: {valueFallback: {a: 2}}})).toEqual({valid: true, validatedValue: [{a:2}]})

    data.a = 'b'
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{a:'b'}]}) // Object reference is still holding
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [{a:'b'}]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [{a:'b'}]})

    data = ['a']
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{a:'b'}]}) // Object reference is still holding
    expect(validator2.validate()).toEqual({valid: true, validatedValue: [['a']]})
    expect(validator3.validate()).toEqual({valid: true, validatedValue: [['a']]})

    data = 'ab'
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{a:'b'}]}) // Object reference is still holding
    expect(validator2.validate()).toEqual({valid: true, validatedValue: ['ab']}) //String is treated as array here
    expect(validator3.validate()).toEqual({valid: true, validatedValue: ['ab']}) //String is treated as array here

    data = 10
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{a:'b'}]}) // Object reference is still holding
    expect(validator2.validate()).toEqual(hasMemberFails)
    expect(validator3.validate()).toEqual(hasMemberFails)

    data = []
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{a:'b'}]}) // Object reference is still holding
    expect(validator2.validate()).toEqual(hasMemberFails)
    expect(validator3.validate()).toEqual(hasMemberFails)

    data = {}
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{a:'b'}]}) // Object reference is still holding
    expect(validator2.validate()).toEqual(hasMemberFails)
    expect(validator3.validate()).toEqual(hasMemberFails)

    data = null
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{a:'b'}]}) // Object reference is still holding
    expect(validator2.validate()).toEqual(hasMemberFails)
    expect(validator3.validate()).toEqual(hasMemberFails)

    data = ''
    expect(validator1.validate()).toEqual({valid: true, validatedValue: [{a:'b'}]}) // Object reference is still holding
    expect(validator2.validate()).toEqual(hasMemberFails)
    expect(validator3.validate()).toEqual(hasMemberFails)

  })
})