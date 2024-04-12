import { describe, expect, it } from 'vitest'
import { externalData } from '../store.js'
import { ExternalDataStore } from '../types.js'

describe('Test external data store', () => {
  it('External data behaves as singleton', async () => {
    const store1 = externalData

    store1.set({
      'test' : 'valueTest'
    })

    const store2: ExternalDataStore = externalData

    expect(store2.get('test')).toBe('valueTest')

  })
  it('Has function works', async () => {
    const store1 = externalData

    store1.set({
      'test' : 'valueTest'
    })

    expect(store1.has('test')).toBe(true)

    store1.get('test') //By default the keys are removed on first query

    expect(store1.has('test')).toBe(false)

  })
  it('Retaining value works works', async () => {
    const store1 = externalData

    store1.set({
      'test' : 'valueTest'
    })

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