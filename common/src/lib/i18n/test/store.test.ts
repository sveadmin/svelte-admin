import { describe, expect, it } from 'vitest'
import {
  createTranslationStore,
  i18n,
  LOCALE_ENGLISH_UNITED_KINGDOM,
  LOCALE_FRENCH_FRANCE,
} from '../index.js'
import type { 
  TranslationStore,
} from '../types.js'

describe('Test i18n store', () => {
  it('External data behaves as singleton', async () => {
    const store1: TranslationStore = i18n

    store1.add({
      translations: {
        'key-one': 'Key One',
        'key-two': 'Key Two',
      }
    })

    const store2: TranslationStore = i18n

    expect(store1.t('key-one')).toBe('Key One')
    expect(store2.t('key-one')).toBe('Key One')
    expect(store1.t('key-two')).toBe('Key Two')
    expect(store2.t('key-two')).toBe('Key Two')
  })

  it('Independent store can be setup', async () => {
    const store1: TranslationStore = i18n

    store1.add({
      translations: {
        'key-one': 'Key One',
        'key-two': 'Key Two',
      }
    })

    const store2: TranslationStore = await createTranslationStore()

    expect(store1.t('key-one')).toBe('Key One')
    expect(store2.t('key-one')).toBe('${key-one}(en_GB)')
    expect(store1.t('key-two')).toBe('Key Two')
    expect(store2.t('key-two')).toBe('${key-two}(en_GB)')
  })

  it('Can change locale', async () => {
    const store1: TranslationStore = await createTranslationStore()

    store1.add({
      translations: {
        'key-one': 'Key One',
        'key-two': 'Key Two',
      }
    })
    store1.add({
      locale: LOCALE_FRENCH_FRANCE,
      translations: {
        'key-one': 'Cle Un',
        'key-two': 'Cle Deux',
      }
    })
    expect(store1.t('key-one')).toBe('Key One')
    store1.setLocale(LOCALE_FRENCH_FRANCE)
    expect(store1.t('key-one')).toBe('Cle Un')

  })

  it('Handles sections', async () => {
    const store1: TranslationStore = await createTranslationStore()

    store1.add({
      translations: {
        'section.key-one': 'Key One',
        'section.key-two': 'Key Two',
        'section.nested.four.times.key-two': 'Nested Value',
      }
    })

    expect(store1.t('section.key-one')).toBe('Key One')
    expect(store1.t('key-one', {}, 'section')).toBe('Key One')
    expect(store1.t('section.key-two')).toBe('Key Two')
    expect(store1.t('key-two', {}, 'section')).toBe('Key Two')
    expect(store1.t('section.nested.four.times.key-two')).toBe('Nested Value')
    expect(store1.t('nested.four.times.key-two', {}, 'section')).toBe('Nested Value')
    expect(store1.t('four.times.key-two', {}, 'section.nested')).toBe('Nested Value')
    expect(store1.t('times.key-two', {}, 'section.nested.four')).toBe('Nested Value')
    expect(store1.t('key-two', {}, 'section.nested.four.times')).toBe('Nested Value')
  })

  it('Does not create section when translations exists', async () => {
    const store1: TranslationStore = await createTranslationStore()

    store1.add({
      translations: {
        'section': 'Section',
        'section.key-one': 'Key One',
      }
    })

    expect(store1.t('section')).toBe('Section')
  })
})