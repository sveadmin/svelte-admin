import { describe, expect, it } from 'vitest'
import { externalData } from '../store.svelte.js'
import type { 
  ExternalDataStore,
} from '../types.js'

describe('Test external data store', () => {
  it('External data behaves as singleton', async () => {
    const store1: ExternalDataStore = externalData

    store1.raw = {
      test: 'valueTest'
    }

    const store2: ExternalDataStore = externalData

    expect(store1.raw?.test).toBe('valueTest')
    expect(store2.raw?.test).toBe('valueTest')
    expect(store1.get('test', {}, false)).toBe('valueTest')
    expect(store2.get('test')).toBe('valueTest') //Removes item

    expect(store1.raw?.test).toBe(undefined)
    expect(store2.raw?.test).toBe(undefined)
    expect(store1.get('test')).toEqual({})
    expect(store2.get('test')).toEqual({})

    store1.raw = {'test2': 'valueTest2'}
    expect(store2.get('test2')).toBe('valueTest2')
    expect(store2.get('test')).toEqual({})
  })

  it('Has function works', async () => {
    const store1 = externalData

    store1.raw = {
      test : 'valueTest'
    }


    expect(store1.has('test')).toBe(true)

    store1.get('test') //By default the keys are removed on first query

    expect(store1.has('test')).toBe(false)

  })

  it('Retaining value works works', async () => {
    const store1 = externalData

    store1.raw = {
      'test' : 'valueTest'
    }

    expect(store1.has('test')).toBe(true)

    store1.get('test', null, false)

    expect(store1.has('test')).toBe(true)
  })

  it('Default works', async () => {
    const store1 = externalData

    const test = store1.get('notSet', 'defaultValue')

    expect(test).toBe('defaultValue')
  })
})