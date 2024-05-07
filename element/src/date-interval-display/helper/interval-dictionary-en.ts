import {
  prepareSimpleIntervalDictionary,
} from './simple-interval-dictionary.js'

export const intervalDictionaryEnglish = prepareSimpleIntervalDictionary(
  (isPastDate: boolean) => (isPastDate) ? '' : 'in ',
  (isPastDate: boolean) => (isPastDate) ? ' ago' : '',
)