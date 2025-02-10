import {
  i18n as defaultI18n,
  type TranslationStore,
} from '@sveadmin/common'

import {
  TEXT_DISPLAY_TYPE_INTERVAL,
  TEXT_DISPLAY_TYPE_WEEK,
  TIME_MINUTE_2DIGIT,
  TIME_SECOND_2DIGIT,
} from '../types.js'

import type {
  DateSplitterSettings,
  TextDisplayPartDateTimeObjects,
} from '../types.js'

import {
  prepareDateSplitterFilter,
} from './date-splitter-filter.js'

import {
  prepareDateSplitterMap,
} from './date-splitter-map.js'

export function dateSplitter(
  value: any,
  dynamicParts?: TextDisplayPartDateTimeObjects[],
  i18n: TranslationStore = defaultI18n
) : any[]
{
  if (!Array.isArray(value)) {
    value = [value]
  }
  return value.reduce((aggregator: any[], currentValue: any, index: number) => {
    if (currentValue instanceof Date === false) {
      currentValue = new Date(currentValue)
    }
    if (currentValue instanceof Date === false) {
      return aggregator
    }

    const settings: DateSplitterSettings = {
      dateNeeded: false,
      intervalNeeded: false,
      options: {},
      timeNeeded: false,
    }


    const dateTimeParts = dynamicParts?.filter(prepareDateSplitterFilter(settings, index))
    if ('timeZone' !in settings.options
      && settings.timeZone) {
      settings.options.timeZone = settings.timeZone
    }

    if (Object.keys(settings.options).length === 1) {
      //This fixes an issue with minute settings: 2-digit is not fuinction in Chrome, the only way to get the 2 digit values of these is to set timeStyle: medium
      if (settings.options?.minute === TIME_MINUTE_2DIGIT) {
        settings.options = {}
      }
      if (settings.options?.second === TIME_SECOND_2DIGIT) {
        settings.options = {}
      }
    }
    if (Object.keys(settings.options).length === 0) {
      if (settings.dateNeeded) {
        settings.options.dateStyle = 'short'
      }
      if (settings.timeNeeded) {
        settings.options.timeStyle = 'medium'
      }
    }

    const dateTimeFormat = new Intl.DateTimeFormat(settings.locale, settings.options)

    let formattedParts
    try {
      formattedParts = dateTimeFormat.formatToParts(currentValue)
    } catch (e) {
      return dateTimeParts?.map(() => '')
    }

    const mappedParts = formattedParts.reduce((aggregator: {[key: string] : Intl.DateTimeFormatPart}, currentPart) => {
      aggregator[currentPart.type] = currentPart
      return aggregator
    }, {})

    if (settings.weekNeeded) {
      mappedParts[TEXT_DISPLAY_TYPE_WEEK] = {type: 'unknown', value: ''}
    }
    if (settings.intervalNeeded) {
      mappedParts[TEXT_DISPLAY_TYPE_INTERVAL] = {type: 'unknown', value: ''}
    }

    const partsToBeAdded: string[] = dateTimeParts?.map(prepareDateSplitterMap(currentValue, dateTimeFormat, mappedParts, i18n)) ?? []
    aggregator.push(...partsToBeAdded)
    return aggregator
  }, [])

}