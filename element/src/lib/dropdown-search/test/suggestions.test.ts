import { describe, expect, it } from 'vitest'

import {
  prepareGenerateSuggestions,
} from '../helper/index.js'

import {
  options,
} from './mock/options.js'


describe('Test suggestions', () => {
  it('Suggestions return top elements when no value is given', async () => {
    const generateSuggestions = prepareGenerateSuggestions(options)
    const generateSuggestionsEmptyAllowed = prepareGenerateSuggestions(options, 10, true)

    const suggestions = generateSuggestions()

  // console.log(suggestions.map(id => [id, options.optionsByValue[id]]))

    expect(suggestions.length).toBe(10)
    expect(suggestions[0]).toBe('1')
    expect(suggestions[1]).toBe('2')
    expect(suggestions[2]).toBe('3')
    expect(suggestions[3]).toBe('4')
    expect(suggestions[4]).toBe('5')
    expect(suggestions[5]).toBe('6')
    expect(suggestions[6]).toBe('7')
    expect(suggestions[7]).toBe('8')
    expect(suggestions[8]).toBe('9')
    expect(suggestions[9]).toBe('10')

    const suggestionsEmptyAllowed = generateSuggestionsEmptyAllowed()
    
    expect(suggestionsEmptyAllowed.length).toBe(11)
    expect(suggestionsEmptyAllowed[0]).toBe('1')
    expect(suggestionsEmptyAllowed[1]).toBe('2')
    expect(suggestionsEmptyAllowed[2]).toBe('3')
    expect(suggestionsEmptyAllowed[3]).toBe('4')
    expect(suggestionsEmptyAllowed[4]).toBe('5')
    expect(suggestionsEmptyAllowed[5]).toBe('6')
    expect(suggestionsEmptyAllowed[6]).toBe('7')
    expect(suggestionsEmptyAllowed[7]).toBe('8')
    expect(suggestionsEmptyAllowed[8]).toBe('9')
    expect(suggestionsEmptyAllowed[9]).toBe('10')
    expect(suggestionsEmptyAllowed[10]).toBe(null)

    const suggestions2 = generateSuggestions(null)

    expect(suggestions2.length).toBe(10)
    expect(suggestions2[0]).toBe('1')
    expect(suggestions2[1]).toBe('2')
    expect(suggestions2[2]).toBe('3')
    expect(suggestions2[3]).toBe('4')
    expect(suggestions2[4]).toBe('5')
    expect(suggestions2[5]).toBe('6')
    expect(suggestions2[6]).toBe('7')
    expect(suggestions2[7]).toBe('8')
    expect(suggestions2[8]).toBe('9')
    expect(suggestions2[9]).toBe('10')

    const suggestionsEmptyAllowed2 = generateSuggestionsEmptyAllowed()

    expect(suggestionsEmptyAllowed2.length).toBe(11)
    expect(suggestionsEmptyAllowed2[0]).toBe('1')
    expect(suggestionsEmptyAllowed2[1]).toBe('2')
    expect(suggestionsEmptyAllowed2[2]).toBe('3')
    expect(suggestionsEmptyAllowed2[3]).toBe('4')
    expect(suggestionsEmptyAllowed2[4]).toBe('5')
    expect(suggestionsEmptyAllowed2[5]).toBe('6')
    expect(suggestionsEmptyAllowed2[6]).toBe('7')
    expect(suggestionsEmptyAllowed2[7]).toBe('8')
    expect(suggestionsEmptyAllowed2[8]).toBe('9')
    expect(suggestionsEmptyAllowed2[9]).toBe('10')
    expect(suggestionsEmptyAllowed2[10]).toBe(null)
  })

  it('can set suggestion length', async () => {
    const generateSuggestions3 = prepareGenerateSuggestions(options, 3)
    const generateSuggestionsEmptyAllowed3 = prepareGenerateSuggestions(options, 3, true)
    const generateSuggestions5 = prepareGenerateSuggestions(options, 5)
    const generateSuggestionsEmptyAllowed5 = prepareGenerateSuggestions(options, 5, true)

    const suggestions3 = generateSuggestions3()
    const suggestionsEmptyAllowed3 = generateSuggestionsEmptyAllowed3()
    const suggestions5 = generateSuggestions5()
    const suggestionsEmptyAllowed5 = generateSuggestionsEmptyAllowed5()

    expect(suggestions3.length).toBe(3)
    expect(suggestions3[0]).toBe('1')
    expect(suggestions3[1]).toBe('2')
    expect(suggestions3[2]).toBe('3')

    expect(suggestionsEmptyAllowed3.length).toBe(4)
    expect(suggestionsEmptyAllowed3[0]).toBe('1')
    expect(suggestionsEmptyAllowed3[1]).toBe('2')
    expect(suggestionsEmptyAllowed3[2]).toBe('3')
    expect(suggestionsEmptyAllowed3[3]).toBe(null)

    expect(suggestions5.length).toBe(5)
    expect(suggestions5[0]).toBe('1')
    expect(suggestions5[1]).toBe('2')
    expect(suggestions5[2]).toBe('3')
    expect(suggestions5[3]).toBe('4')
    expect(suggestions5[4]).toBe('5')

    expect(suggestionsEmptyAllowed5.length).toBe(6)
    expect(suggestionsEmptyAllowed5[0]).toBe('1')
    expect(suggestionsEmptyAllowed5[1]).toBe('2')
    expect(suggestionsEmptyAllowed5[2]).toBe('3')
    expect(suggestionsEmptyAllowed5[3]).toBe('4')
    expect(suggestionsEmptyAllowed5[4]).toBe('5')
    expect(suggestionsEmptyAllowed5[5]).toBe(null)
  })

  it('can search in the options', async () => {
    const generateSuggestions = prepareGenerateSuggestions(options)

    const suggestions = generateSuggestions('c')

    expect(suggestions.length).toBe(9)

    expect(suggestions[0]).toBe('1')
    expect(suggestions[1]).toBe('7')
    expect(suggestions[2]).toBe('13')
    expect(suggestions[3]).toBe('3')
    expect(suggestions[4]).toBe('8')
    expect(suggestions[5]).toBe('15')
    expect(suggestions[6]).toBe('23')
    expect(suggestions[7]).toBe('12') //color match
    expect(suggestions[8]).toBe('19') //color match

    const suggestions2 = generateSuggestions('ra')

    expect(suggestions2.length).toBe(6)
    expect(suggestions2[0]).toBe('17')
    expect(suggestions2[1]).toBe('19')
    expect(suggestions2[2]).toBe('21')
    expect(suggestions2[3]).toBe('10')
    expect(suggestions2[4]).toBe('13') //color match
    expect(suggestions2[5]).toBe('23') //color match

    const suggestions3 = generateSuggestions('cat')
    expect(suggestions3.length).toBe(1)
    expect(suggestions3[0]).toBe('13')

    const suggestionsEmpty = generateSuggestions('yx')
    expect(suggestionsEmpty.length).toBe(0)
  })

  it('prioritizes id match', async () => {
    const generateSuggestions = prepareGenerateSuggestions(options)

    const suggestions = generateSuggestions(13)

    expect(suggestions.length).toBe(3)
    expect(suggestions[0]).toBe('13')
    expect(suggestions[1]).toBe('6')
    expect(suggestions[2]).toBe('24')
  })

  it('Soft match fill up until limit', async () => {
    const generateSuggestions = prepareGenerateSuggestions(options)

    const suggestions = generateSuggestions('m')
    expect(suggestions.length).toBe(5)
    expect(suggestions[0]).toBe('15')
    expect(suggestions[1]).toBe('22')
    expect(suggestions[2]).toBe('2') //color match
    expect(suggestions[3]).toBe('6') //color match
    expect(suggestions[4]).toBe('8') //color match

    const suggestions2 = generateSuggestions('b')
    expect(suggestions2.length).toBe(10)
    expect(suggestions2[0]).toBe('16')
    expect(suggestions2[1]).toBe('23')
    expect(suggestions2[2]).toBe('7')
    expect(suggestions2[3]).toBe('8')
    expect(suggestions2[4]).toBe('15')
    expect(suggestions2[5]).toBe('17')
    expect(suggestions2[6]).toBe('22')
    expect(suggestions2[7]).toBe('1')
    expect(suggestions2[8]).toBe('6')
    expect(suggestions2[9]).toBe('9')
  })

  it('Colon does not confuse search', async () => {
    const generateSuggestions = prepareGenerateSuggestions(options)

    const suggestions = generateSuggestions(':')

    expect(suggestions.length).toBe(10)
    expect(suggestions[0]).toBe('1')
    expect(suggestions[1]).toBe('2')
    expect(suggestions[2]).toBe('3')
    expect(suggestions[3]).toBe('4')
    expect(suggestions[4]).toBe('5')
    expect(suggestions[5]).toBe('6')
    expect(suggestions[6]).toBe('7')
    expect(suggestions[7]).toBe('8')
    expect(suggestions[8]).toBe('9')
    expect(suggestions[9]).toBe('10')
  })

  it('searching for text with colon inside value works', async () => {
    const generateSuggestions = prepareGenerateSuggestions(options)

    const suggestions = generateSuggestions(':50')
    expect(suggestions.length).toBe(3)
    expect(suggestions[0]).toBe('12')
    expect(suggestions[1]).toBe('17')
    expect(suggestions[2]).toBe('24')

    const suggestions2 = generateSuggestions('20:50')
    expect(suggestions2.length).toBe(1)
    expect(suggestions2[0]).toBe('17')
  })

  it('Property search works', async () => {
    const generateSuggestions = prepareGenerateSuggestions(options)

    const suggestions = generateSuggestions('color:blue')
    expect(suggestions.length).toBe(3)
    expect(suggestions[0]).toBe('1')
    expect(suggestions[1]).toBe('6')
    expect(suggestions[2]).toBe('9')

    const suggestions2 = generateSuggestions('size:s')
    expect(suggestions2.length).toBe(10)
    expect(suggestions2[0]).toBe('1')
    expect(suggestions2[1]).toBe('4')
    expect(suggestions2[2]).toBe('5')
    expect(suggestions2[3]).toBe('10')
    expect(suggestions2[4]).toBe('11')
    expect(suggestions2[5]).toBe('13')
    expect(suggestions2[6]).toBe('15')
    expect(suggestions2[7]).toBe('17')
    expect(suggestions2[8]).toBe('18')
    expect(suggestions2[9]).toBe('19')

    const suggestions3 = generateSuggestions('size:xs')
    expect(suggestions3.length).toBe(9)
    expect(suggestions3[0]).toBe('4')
    expect(suggestions3[1]).toBe('5')
    expect(suggestions3[2]).toBe('15')
    expect(suggestions3[3]).toBe('17')
    expect(suggestions3[4]).toBe('18')
    expect(suggestions3[5]).toBe('20')
    expect(suggestions3[6]).toBe('21')
    expect(suggestions3[7]).toBe('22')
    expect(suggestions3[8]).toBe('23')
  })
})