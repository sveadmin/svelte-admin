import {
  afterAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest'
import {
  createTranslationStore,
  i18n,
  LOCALE_ENGLISH_UNITED_KINGDOM,
  LOCALE_FRENCH_FRANCE,
} from '../index.js'

import type {
  AllowedLocales,
  TranslationStore,
  TranslateVariableFunction,
} from '../types.js'

import {
  CUSTOM_LOCALE_EWOKESE,
  CUSTOM_LOCALE_KLINGON,
} from './mock/custom-locales.js'

describe('Test i18n store', () => {
  it('i18n behaves as singleton', async () => {
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

  it('Can use different default locale', async () => {
    const store1: TranslationStore = await createTranslationStore({
      defaultLocale: LOCALE_FRENCH_FRANCE
    })

    store1.add({
      locale: LOCALE_ENGLISH_UNITED_KINGDOM,
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
    expect(store1.t('key-one')).toBe('Cle Un')
  })

  it('Supports custom locales', async () => {
    const {
      ALLOWED_LOCALES
    } = await import('./mock/custom-locales.js') as AllowedLocales

    const store1: TranslationStore = await createTranslationStore({
      allowedLocales: ALLOWED_LOCALES
    })

    const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    afterAll(() => {
      consoleMock.mockReset();
    })

    store1.add({
      locale: CUSTOM_LOCALE_EWOKESE,
      translations: {
        'key-one': 'Star Trek is best',
        'key-two': 'Star Wars is best',
      }
    })
    store1.add({
      locale: CUSTOM_LOCALE_KLINGON,
      translations: {
        'key-one': 'Star Wars is best',
        'key-two': 'Star Trek is best',
      }
    })
    // Invalid locales are ignored
    store1.add({
      locale: LOCALE_FRENCH_FRANCE,
      translations: {
        'key-one': 'France is best',
        'key-two': 'France is best',
      }
    })
    expect(consoleMock).toHaveBeenCalledTimes(1);
    expect(consoleMock).toHaveBeenLastCalledWith('fr_FR is not in the list of allowed locales');

    expect(store1.t('key-one')).toBe('Star Trek is best')
    expect(store1.t('key-two')).toBe('Star Wars is best')
    store1.setLocale(CUSTOM_LOCALE_KLINGON)
    expect(store1.t('key-one')).toBe('Star Wars is best')
    expect(store1.t('key-two')).toBe('Star Trek is best')

    store1.setLocale(LOCALE_FRENCH_FRANCE) //Setting invalid language does not change selected language
    expect(consoleMock).toHaveBeenCalledTimes(2);
    expect(consoleMock).toHaveBeenLastCalledWith('fr_FR is not in the list of allowed locales');
    expect(store1.t('key-one')).toBe('Star Wars is best')
    expect(store1.t('key-two')).toBe('Star Trek is best')
  })

  it('Can change fallback behaviour', async () => {
    const store1: TranslationStore = await createTranslationStore()
    const store2: TranslationStore = await createTranslationStore({
      fallbackToDefault: false
    })

    store1.add({
      locale: LOCALE_ENGLISH_UNITED_KINGDOM,
      translations: {
        'key-one': 'Key One',
        'key-two': 'Key Two',
      }
    })
    store1.add({
      locale: LOCALE_FRENCH_FRANCE,
      translations: {
        'key-one': 'Cle Un',
      }
    })
    store2.add({
      locale: LOCALE_ENGLISH_UNITED_KINGDOM,
      translations: {
        'key-one': 'Key One',
        'key-two': 'Key Two',
      }
    })
    store2.add({
      locale: LOCALE_FRENCH_FRANCE,
      translations: {
        'key-one': 'Cle Un',
      }
    })

    store1.setLocale(LOCALE_FRENCH_FRANCE)
    store2.setLocale(LOCALE_FRENCH_FRANCE)
    expect(store1.t('key-one')).toBe('Cle Un')
    expect(store1.t('key-two')).toBe('Key Two')
    expect(store2.t('key-one')).toBe('Cle Un')
    expect(store2.t('key-two')).toBe('${key-two}(fr_FR)')
  })

  it('Handles sections', async () => {
    const store1: TranslationStore = await createTranslationStore()
    const store2: TranslationStore = await createTranslationStore() // This is with fallback
    const store3: TranslationStore = await createTranslationStore({
      fallbackToDefault: false
    }) // This is without fallback
    store1.add({
      translations: {
        'section.key-one': 'Key One',
        'section.key-two': 'Key Two',
        'section.nested.four.times.key-two': 'Nested Value',
      }
    })
    store2.add({
      translations: {
        'section.key-one': 'Key One',
        'section.key-two': 'Key Two',
        'section.nested.four.times.key-two': 'Nested Value',
      }
    })
    store3.add({
      translations: {
        'section.key-one': 'Key One',
        'section.key-two': 'Key Two',
        'section.nested.four.times.key-two': 'Nested Value',
      }
    })
    store2.setLocale(LOCALE_FRENCH_FRANCE)
    store3.setLocale(LOCALE_FRENCH_FRANCE)

    expect(store1.t('section.key-one')).toBe('Key One')
    expect(store1.t('key-one', {}, 'section')).toBe('Key One')
    expect(store1.t('section.key-two')).toBe('Key Two')
    expect(store1.t('key-two', {}, 'section')).toBe('Key Two')
    expect(store1.t('section.nested.four.times.key-two')).toBe('Nested Value')
    expect(store1.t('nested.four.times.key-two', {}, 'section')).toBe('Nested Value')
    expect(store1.t('four.times.key-two', {}, 'section.nested')).toBe('Nested Value')
    expect(store1.t('times.key-two', {}, 'section.nested.four')).toBe('Nested Value')
    expect(store1.t('key-two', {}, 'section.nested.four.times')).toBe('Nested Value')
    
    expect(store1.get('section', {})).toEqual({'key-one': 'Key One', 'key-two': 'Key Two', nested: {four: {times: {'key-two': 'Nested Value'}}}})
    expect(store1.get('nested', {}, 'section')).toEqual({four: {times: {'key-two': 'Nested Value'}}})
    expect(store1.get('four', {}, 'section.nested')).toEqual({times: {'key-two': 'Nested Value'}})
    expect(store1.get('times', {}, 'section.nested.four')).toEqual({'key-two': 'Nested Value'})

    expect(store2.t('section.key-one')).toBe('Key One')
    expect(store2.t('key-one', {}, 'section')).toBe('Key One')
    expect(store2.t('section.key-two')).toBe('Key Two')
    expect(store2.t('key-two', {}, 'section')).toBe('Key Two')
    expect(store2.t('section.nested.four.times.key-two')).toBe('Nested Value')
    expect(store2.t('nested.four.times.key-two', {}, 'section')).toBe('Nested Value')
    expect(store2.t('four.times.key-two', {}, 'section.nested')).toBe('Nested Value')
    expect(store2.t('times.key-two', {}, 'section.nested.four')).toBe('Nested Value')
    expect(store2.t('key-two', {}, 'section.nested.four.times')).toBe('Nested Value')
    
    expect(store2.get('section', {})).toEqual({'key-one': 'Key One', 'key-two': 'Key Two', nested: {four: {times: {'key-two': 'Nested Value'}}}})
    expect(store2.get('nested', {}, 'section')).toEqual({four: {times: {'key-two': 'Nested Value'}}})
    expect(store2.get('four', {}, 'section.nested')).toEqual({times: {'key-two': 'Nested Value'}})
    expect(store2.get('times', {}, 'section.nested.four')).toEqual({'key-two': 'Nested Value'})

    expect(store3.t('section.key-one')).toBe('${section.key-one}(fr_FR)')
    expect(store3.t('key-one', {}, 'section')).toBe('${section.key-one}(fr_FR)')
    expect(store3.t('section.key-two')).toBe('${section.key-two}(fr_FR)')
    expect(store3.t('key-two', {}, 'section')).toBe('${section.key-two}(fr_FR)')
    expect(store3.t('section.nested.four.times.key-two')).toBe('${section.nested.four.times.key-two}(fr_FR)')
    expect(store3.t('nested.four.times.key-two', {}, 'section')).toBe('${section.nested.four.times.key-two}(fr_FR)')
    expect(store3.t('four.times.key-two', {}, 'section.nested')).toBe('${section.nested.four.times.key-two}(fr_FR)')
    expect(store3.t('times.key-two', {}, 'section.nested.four')).toBe('${section.nested.four.times.key-two}(fr_FR)')
    expect(store3.t('key-two', {}, 'section.nested.four.times')).toBe('${section.nested.four.times.key-two}(fr_FR)')
    
    expect(store3.get('section', {})).toEqual('${section}(fr_FR)')
    expect(store3.get('nested', {}, 'section')).toEqual('${section.nested}(fr_FR)')
    expect(store3.get('four', {}, 'section.nested')).toEqual('${section.nested.four}(fr_FR)')
    expect(store3.get('times', {}, 'section.nested.four')).toEqual('${section.nested.four.times}(fr_FR)')
  })

  it('Overwrites values', async () => {
    const store1: TranslationStore = await createTranslationStore()

    store1.add({
      translations: {
        'key-one': 'Key One',
        'key-two': 'Key Two',
      }
    })

    expect(store1.t('key-one')).toBe('Key One')
    expect(store1.t('key-two')).toBe('Key Two')
    
    store1.add({
      translations: {
        'key-one': 'Key One Updated',
      }
    })

    expect(store1.t('key-one')).toBe('Key One Updated')
    expect(store1.t('key-two')).toBe('Key Two')
  })

  it('Changes section when it gets extended', async () => {
    const store1: TranslationStore = await createTranslationStore()
    const store2: TranslationStore = await createTranslationStore({
      fallbackToDefault: false
    })

    store1.add({
      translations: {
        'section': 'Section',
      }
    })
    store2.add({
      translations: {
        'section': 'Section',
      }
    })
    expect(store1.t('section')).toBe('Section')
    store2.setLocale(LOCALE_FRENCH_FRANCE)
    expect(store2.t('section')).toBe('${section}(fr_FR)')

    store1.add({
      translations: {
        'section.key-one': 'Key One',
        'section.nested.four.times.key-two': 'Nested Value',
      }
    })
    store2.add({
      locale: LOCALE_ENGLISH_UNITED_KINGDOM,
      translations: {
        'section.key-one': 'Key One',
        'section.nested.four.times.key-two': 'Nested Value',
      }
    })

    expect(store1.t('section')).toBe('Section')
    expect(store1.t('section.nested.four.times.key-two')).toBe('Nested Value')
    expect(store1.t('nested.four.times.key-two', {}, 'section')).toBe('Nested Value')
    expect(store1.t('four.times.key-two', {}, 'section.nested')).toBe('Nested Value')
    expect(store1.t('times.key-two', {}, 'section.nested.four')).toBe('Nested Value')
    expect(store1.t('key-two', {}, 'section.nested.four.times')).toBe('Nested Value')

    expect(store2.t('section')).toBe('${section}(fr_FR)')
    expect(store2.t('section.nested.four.times.key-two')).toBe('${section.nested.four.times.key-two}(fr_FR)')
    expect(store2.t('nested.four.times.key-two', {}, 'section')).toBe('${section.nested.four.times.key-two}(fr_FR)')
    expect(store2.t('four.times.key-two', {}, 'section.nested')).toBe('${section.nested.four.times.key-two}(fr_FR)')
    expect(store2.t('times.key-two', {}, 'section.nested.four')).toBe('${section.nested.four.times.key-two}(fr_FR)')
    expect(store2.t('key-two', {}, 'section.nested.four.times')).toBe('${section.nested.four.times.key-two}(fr_FR)')
  })

  it('Does simple substitution', async () => {
    const store1: TranslationStore = await createTranslationStore()

    store1.add({
      translations: {
        'substitute-one': 'This is a ${dynamic} value',
      }
    })

    expect(store1.t('substitute-one', {dynamic: 'nice'})).toBe('This is a nice value')
    expect(store1.t('substitute-one', {dynamic: 'even nicer'})).toBe('This is a even nicer value')
  })

  it('Can use function in translations', async () => {
    const store1: TranslationStore = await createTranslationStore()

    const dynamicFunction : TranslateVariableFunction = (
      t,
      variables,
      variableKey
    ) : string => {
      const value: number = parseInt(variables && variables['number'].toString() || '')
      return (value % 2) ? 'odd' : 'even'
    }

    store1.add({
      translations: {
        'substitute-one': 'Number ${number} is ${dynamic}',
      }
    })

    expect(store1.t('substitute-one', {dynamic: dynamicFunction, number: 1})).toBe('Number 1 is odd')
    expect(store1.t('substitute-one', {dynamic: dynamicFunction, number: 2})).toBe('Number 2 is even')

  })

  it('Can use different keys in translate function', async () => {
    const store1: TranslationStore = await createTranslationStore()

    const prefixFunction : TranslateVariableFunction = (
      t,
      variables,
      variableKey
    ) : string => {
      const value: number = variables && variables['value'] as number || 0
      return (value >= 0)
        ? t('prefix-in').toString()
        : t('prefix-empty').toString()
    }

    const postfixFunction : TranslateVariableFunction = (
      t,
      variables,
      variableKey
    ) : string => {
      const value: number = variables && variables['value'] as number || 0
      return (value >= 0)
        ? t('postfix-empty').toString()
        : t('postfix-ago').toString()
    }

    const intervalFunction : TranslateVariableFunction = (
      t,
      variables,
      variableKey
    ) : string => {
      const value: number = variables && variables['value'] as number || 0
      const absValue = Math.abs(value)
      return (absValue > 1)
        ? absValue + ' ' + t('days')
        : absValue + ' ' + t('day')
    }

    store1.add({
      translations: {
        'prefix-in' : 'in ',
        'prefix-empty' : '',
        'postfix-ago' : ' ago',
        'postfix-empty' : '',
        'day': 'day',
        'days': 'days',
        'substitute-one': '${prefix}${interval}${postfix}',
      }
    })

    expect(store1.t('substitute-one', {
      prefix: prefixFunction,
      interval: intervalFunction,
      postfix: postfixFunction,
      value: -1
    })).toBe('1 day ago')

    expect(store1.t('substitute-one', {
      prefix: prefixFunction,
      interval: intervalFunction,
      postfix: postfixFunction,
      value: 1
    })).toBe('in 1 day')

    expect(store1.t('substitute-one', {
      prefix: prefixFunction,
      interval: intervalFunction,
      postfix: postfixFunction,
      value: -3
    })).toBe('3 days ago')

    expect(store1.t('substitute-one', {
      prefix: prefixFunction,
      interval: intervalFunction,
      postfix: postfixFunction,
      value: 3
    })).toBe('in 3 days')

  })
})