import {
  afterAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest'

import {
  readOnlyRune,
  rune,
} from '../index.js'

import {
  runeChanger,
  runeReader,
} from './helper/index.js'


describe('Test Runes', () => {
  it('Rune encapsulation works, but not reactive on the simple types', async () => {
    let value: any = $state('')

    const runedValue = rune(value)

    expect(runeReader(runedValue)).toBe('')

    value = 12
    expect(runeReader(runedValue)).toBe('')

    runedValue.value = 23
    expect(runeReader(runedValue)).toBe(23)
    expect(value).toBe(12)

    runeChanger(runedValue, 12.34)
    expect(runeReader(runedValue)).toBe(12.34)
    expect(value).toBe(12)
  })

  it('Rune encapsulation works, and is reactive on not simple types', async () => {
    let value: any = $state([])

    const runedValue = rune(value)

    expect(runeReader(runedValue)).toEqual([])

    value.push(12)
    expect(runeReader(runedValue)).toEqual([12])

    runedValue.value.push(23)
    expect(runeReader(runedValue)).toEqual([12, 23])
    expect(value).toEqual([12, 23])

    runeChanger(runedValue, [12.34])
    expect(runeReader(runedValue)).toEqual([12.34])
    expect(value).toEqual([12, 23])
  })

  it('Readonly rune encapsulation works', async () => {
    let value: any = $state([])

    const runedValue = readOnlyRune(value)

    expect(runeReader(runedValue)).toEqual([])

    value.push(12)
    expect(runeReader(runedValue)).toEqual([12])

    runedValue.value.push(23)
    expect(runeReader(runedValue)).toEqual([12])
    expect(value).toEqual([12])

    runeChanger(runedValue, [12.34])
    expect(runeReader(runedValue)).toEqual([12])
    expect(value).toEqual([12])

    value.push(23)
    expect(runeReader(runedValue)).toEqual([12, 23])
    expect(value).toEqual([12, 23])
  })
})