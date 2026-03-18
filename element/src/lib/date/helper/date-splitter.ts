import {
  i18n as defaultI18n,
  type TranslationStore,
} from '@sveadmin/common'

import type {
  SveadminComponent,
} from '$lib/types.js'

import {
  COMPONENT_INTERVAL,
} from '../interval-types.js'

import {
  TIME_MINUTE_2DIGIT,
} from '../minute-types.js'

import {
  TIME_SECOND_2DIGIT,
} from '../second-types.js'

import {
  DATE_STYLE_SHORT,
  TIME_STYLE_MEDIUM,
} from '../types.js'

import type {
  DateSplitterSettings,
} from '../types.js'

import {
  COMPONENT_WEEK,
} from '../week-types.js'

import {
  prepareDateSplitterFilter,
} from './date-splitter-filter.js'

import {
  prepareDateSplitterMap,
} from './date-splitter-map.js'

export function dateSplitter(
  value: any,
  dynamicParts?: SveadminComponent[],
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
    if (currentValue instanceof Date === false) { // Date constructir was unable to parse the input
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
      //This fixes an issue with minute settings: 2-digit is not functioning in Chrome, the only way to get the 2 digit values of these is to set timeStyle: medium
      if (settings.options?.minute === TIME_MINUTE_2DIGIT) {
        settings.options = {}
      }
      if (settings.options?.second === TIME_SECOND_2DIGIT) {
        settings.options = {}
      }
    }
    if (Object.keys(settings.options).length === 0) {
      if (settings.dateNeeded) {
        settings.options.dateStyle = DATE_STYLE_SHORT
      }
      if (settings.timeNeeded) {
        settings.options.timeStyle = TIME_STYLE_MEDIUM
      }
    }

    const dateTimeFormat = new Intl.DateTimeFormat(settings.locale, settings.options)

    let formattedParts
    try {
      formattedParts = dateTimeFormat.formatToParts(currentValue)
    } catch (e) {
      const error = e as Error
      console.error('Unable to parse dateTimeFormat:' + error.message)
      return dateTimeParts?.map(() => '')
    }

    const mappedParts = formattedParts.reduce((aggregator: {[key: string] : Intl.DateTimeFormatPart}, currentPart) => {
      aggregator[currentPart.type] = currentPart
      return aggregator
    }, {})

    if (settings.weekNeeded) {
      mappedParts[COMPONENT_WEEK] = {type: 'unknown', value: ''}
    }
    if (settings.intervalNeeded) {
      mappedParts[COMPONENT_INTERVAL] = {type: 'unknown', value: ''}
    }

    const partsToBeAdded: string[] = dateTimeParts?.map(prepareDateSplitterMap(currentValue, dateTimeFormat, mappedParts, i18n)) ?? []

    aggregator.push(...partsToBeAdded)
    return aggregator
  }, [])

}