import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  createFieldValidator,
} from '../index.js'

import {
  notEqualToFieldValidator,
} from '../rules/index.js'

import type {
  IsValid,
  ValidatorStore,
} from '../types.js'


describe('Test not equal to field validators', () => {
  it('Not equal to field validator works', async () => {
    const validator1: ValidatorStore = createFieldValidator([notEqualToFieldValidator({dataSet: {base: 'base'}, fieldName: 'base'})])
    const validator2: ValidatorStore = createFieldValidator([notEqualToFieldValidator({dataSet: {base: 'base'}, fieldName: 'base', ignoreEmpty: true})])
    const validator3: ValidatorStore = createFieldValidator([notEqualToFieldValidator({dataSet: {base: 'base'}, fieldName: 'base', ignoreEmpty: false, strictComparison: true})])
    const validator4: ValidatorStore = createFieldValidator([notEqualToFieldValidator({dataSet: {base: 'base'}, fieldName: 'base', ignoreEmpty: true, strictComparison: true})])

    const notEqualToFieldvalidatorFails: IsValid = {
      message: 'Please select a different value, this matches the value of field `base`!',
      error: 'VALUE_MATCHES_BLACKLISTED_COLUMN',
      valid: false
    }

    expect(validator1.validate('different')).toEqual({valid: true, validatedValue: ['different']})
    expect(validator1.validate({value: 'different'})).toEqual({valid: true, validatedValue: ['different']})
    expect(validator1.validate({value: 'different', data: {dataSet: {base: 'base2'}}})).toEqual({valid: true, validatedValue: ['different']})
    expect(validator2.validate('different')).toEqual({valid: true, validatedValue: ['different']})
    expect(validator2.validate({value: 'different'})).toEqual({valid: true, validatedValue: ['different']})
    expect(validator2.validate({value: 'different', data: {dataSet: {base: 'base2'}}})).toEqual({valid: true, validatedValue: ['different']})
    expect(validator3.validate('different')).toEqual({valid: true, validatedValue: ['different']})
    expect(validator3.validate({value: 'different'})).toEqual({valid: true, validatedValue: ['different']})
    expect(validator3.validate({value: 'different', data: {dataSet: {base: 'base2'}}})).toEqual({valid: true, validatedValue: ['different']})
    expect(validator4.validate('different')).toEqual({valid: true, validatedValue: ['different']})
    expect(validator4.validate({value: 'different'})).toEqual({valid: true, validatedValue: ['different']})
    expect(validator4.validate({value: 'different', data: {dataSet: {base: 'base2'}}})).toEqual({valid: true, validatedValue: ['different']})

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

    expect(validator1.validate('base')).toEqual(notEqualToFieldvalidatorFails)
    expect(validator1.validate({value: 'base'})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator1.validate({value: 'base2', data: {dataSet: {base: 'base2'}}})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator2.validate('base')).toEqual(notEqualToFieldvalidatorFails)
    expect(validator2.validate({value: 'base'})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator2.validate({value: 'base2', data: {dataSet: {base: 'base2'}}})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator3.validate('base')).toEqual(notEqualToFieldvalidatorFails)
    expect(validator3.validate({value: 'base'})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator3.validate({value: 'base2', data: {dataSet: {base: 'base2'}}})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator4.validate('base')).toEqual(notEqualToFieldvalidatorFails)
    expect(validator4.validate({value: 'base'})).toEqual(notEqualToFieldvalidatorFails)
    expect(validator4.validate({value: 'base2', data: {dataSet: {base: 'base2'}}})).toEqual(notEqualToFieldvalidatorFails)

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

  it('Not equal to field validator works with runes', async () => {
    let dataSet : any = $state({base: 'base'})
    let fieldName : string = $state('base')

    const validator1: ValidatorStore = createFieldValidator([notEqualToFieldValidator({dataSet, fieldName})])
    const validator2: ValidatorStore = createFieldValidator([notEqualToFieldValidator({dataSet, fieldName, ignoreEmpty: true})])
    const validator3: ValidatorStore = createFieldValidator([notEqualToFieldValidator({dataSet, fieldName, ignoreEmpty: false, strictComparison: true})])
    const validator4: ValidatorStore = createFieldValidator([notEqualToFieldValidator({dataSet, fieldName, ignoreEmpty: true, strictComparison: true})])
    const validator5: ValidatorStore = createFieldValidator([notEqualToFieldValidator({get dataSet () { return dataSet}, get fieldName () { return fieldName}})])
    const validator6: ValidatorStore = createFieldValidator([notEqualToFieldValidator({get dataSet () { return dataSet}, get fieldName () { return fieldName}, ignoreEmpty: true})])
    const validator7: ValidatorStore = createFieldValidator([notEqualToFieldValidator({get dataSet () { return dataSet}, get fieldName () { return fieldName}, ignoreEmpty: false, strictComparison: true})])
    const validator8: ValidatorStore = createFieldValidator([notEqualToFieldValidator({get dataSet () { return dataSet}, get fieldName () { return fieldName}, ignoreEmpty: true, strictComparison: true})])

    const notEqualToFieldvalidatorFails: IsValid = {
      message: 'Please select a different value, this matches the value of field `base`!',
      error: 'VALUE_MATCHES_BLACKLISTED_COLUMN',
      valid: false
    }

    expect(validator1.validate('different')).toEqual({valid: true, validatedValue: ['different']})
    expect(validator2.validate('different')).toEqual({valid: true, validatedValue: ['different']})
    expect(validator3.validate('different')).toEqual({valid: true, validatedValue: ['different']})
    expect(validator4.validate('different')).toEqual({valid: true, validatedValue: ['different']})
    expect(validator5.validate('different')).toEqual({valid: true, validatedValue: ['different']})
    expect(validator6.validate('different')).toEqual({valid: true, validatedValue: ['different']})
    expect(validator7.validate('different')).toEqual({valid: true, validatedValue: ['different']})
    expect(validator8.validate('different')).toEqual({valid: true, validatedValue: ['different']})

    expect(validator1.validate('base')).toEqual(notEqualToFieldvalidatorFails)
    expect(validator2.validate('base')).toEqual(notEqualToFieldvalidatorFails)
    expect(validator3.validate('base')).toEqual(notEqualToFieldvalidatorFails)
    expect(validator4.validate('base')).toEqual(notEqualToFieldvalidatorFails)
    expect(validator5.validate('base')).toEqual(notEqualToFieldvalidatorFails)
    expect(validator6.validate('base')).toEqual(notEqualToFieldvalidatorFails)
    expect(validator7.validate('base')).toEqual(notEqualToFieldvalidatorFails)
    expect(validator8.validate('base')).toEqual(notEqualToFieldvalidatorFails)

    dataSet.base = 'base2'
    expect(validator1.validate('base')).toEqual({valid: true, validatedValue: ['base']}) // This works because object stays in scope
    expect(validator2.validate('base')).toEqual({valid: true, validatedValue: ['base']}) // This works because object stays in scope
    expect(validator3.validate('base')).toEqual({valid: true, validatedValue: ['base']}) // This works because object stays in scope
    expect(validator4.validate('base')).toEqual({valid: true, validatedValue: ['base']}) // This works because object stays in scope
    expect(validator5.validate('base')).toEqual({valid: true, validatedValue: ['base']})
    expect(validator6.validate('base')).toEqual({valid: true, validatedValue: ['base']})
    expect(validator7.validate('base')).toEqual({valid: true, validatedValue: ['base']})
    expect(validator8.validate('base')).toEqual({valid: true, validatedValue: ['base']})

    dataSet = {base: 'different'}
    expect(validator1.validate('different')).toEqual({valid: true, validatedValue: ['different']}) // Object is no longer the same
    expect(validator2.validate('different')).toEqual({valid: true, validatedValue: ['different']}) // Object is no longer the same
    expect(validator3.validate('different')).toEqual({valid: true, validatedValue: ['different']}) // Object is no longer the same
    expect(validator4.validate('different')).toEqual({valid: true, validatedValue: ['different']}) // Object is no longer the same
    expect(validator5.validate('different')).toEqual(notEqualToFieldvalidatorFails)
    expect(validator6.validate('different')).toEqual(notEqualToFieldvalidatorFails)
    expect(validator7.validate('different')).toEqual(notEqualToFieldvalidatorFails)
    expect(validator8.validate('different')).toEqual(notEqualToFieldvalidatorFails)

    dataSet = {base: 'base2', addition: 'base'}
    expect(validator1.validate('base2')).toEqual(notEqualToFieldvalidatorFails)
    expect(validator2.validate('base2')).toEqual(notEqualToFieldvalidatorFails)
    expect(validator3.validate('base2')).toEqual(notEqualToFieldvalidatorFails)
    expect(validator4.validate('base2')).toEqual(notEqualToFieldvalidatorFails)
    expect(validator5.validate('base2')).toEqual(notEqualToFieldvalidatorFails)
    expect(validator6.validate('base2')).toEqual(notEqualToFieldvalidatorFails)
    expect(validator7.validate('base2')).toEqual(notEqualToFieldvalidatorFails)
    expect(validator8.validate('base2')).toEqual(notEqualToFieldvalidatorFails)

    fieldName = 'addition'
    expect(validator1.validate('base2')).toEqual(notEqualToFieldvalidatorFails)
    expect(validator2.validate('base2')).toEqual(notEqualToFieldvalidatorFails)
    expect(validator3.validate('base2')).toEqual(notEqualToFieldvalidatorFails)
    expect(validator4.validate('base2')).toEqual(notEqualToFieldvalidatorFails)
    expect(validator5.validate('base2')).toEqual({valid: true, validatedValue: ['base2']})
    expect(validator6.validate('base2')).toEqual({valid: true, validatedValue: ['base2']})
    expect(validator7.validate('base2')).toEqual({valid: true, validatedValue: ['base2']})
    expect(validator8.validate('base2')).toEqual({valid: true, validatedValue: ['base2']})

  })
  it('Not equal to field validator works with custom error message', async () => {
    const errorMessage = 'This is a custom error message'
    const validator1: ValidatorStore = createFieldValidator([notEqualToFieldValidator({
      dataSet: {base: 'base'},
      errorMessage,
      fieldName: 'base'
    })])

    const notEqualToFieldvalidatorFails: IsValid = {
      message: 'This is a custom error message',
      error: 'VALUE_MATCHES_BLACKLISTED_COLUMN',
      valid: false
    }

    expect(validator1.validate({value: null, data: {dataSet: {base: null}}})).toEqual(notEqualToFieldvalidatorFails)

  })
})