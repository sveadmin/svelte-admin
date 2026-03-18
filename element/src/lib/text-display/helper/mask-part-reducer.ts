import {
  COMPONENT_LITERAL,
} from '$lib/literal/index.js'

import type {
  SveaComponentLiteral,
} from '$lib/literal/index.js'

import {
  prepareParseDateFormat,
  prepareMaskOptionsReducer,
  COMPONENT_DAY,
  COMPONENT_DAY_PERIOD,
  COMPONENT_ERA,
  COMPONENT_FRACTIONAL_SECOND,
  COMPONENT_HOUR,
  COMPONENT_INTERVAL,
  COMPONENT_MINUTE,
  COMPONENT_MONTH,
  COMPONENT_SECOND,
  COMPONENT_TIME_ZONE_NAME,
  COMPONENT_WEEK,
  COMPONENT_WEEKDAY, 
  COMPONENT_YEAR,
} from '$lib/date/index.js'

import type {
  DateTimeDisplayProps,
  ComponentDate,
  ComponentDateTime,
  ComponentDateTimeObjects,
  ComponentTime,
} from '$lib/date/index.js'

import {
  TEXT_DISPLAY_TYPE_NUMBER,
} from '$lib/number/index.js'

import {
  TEXT_DISPLAY_TYPE_TEXT,
} from '../types.js'

import type {
  TextDisplayPart,
  TextDisplayPartObjects,
} from '../types.js'

import {
  parseLiteralShortCuts,
} from './parse-literal-shortcuts.js'

export async function prepareMaskPartReducer(parseDateFormat?: (
  maskPart: ComponentDate | ComponentDateTime | ComponentTime) => Array<ComponentDateTimeObjects | SveaComponentLiteral>
) : Promise<(aggregator: TextDisplayPartObjects[], currentPart: TextDisplayPart) => TextDisplayPartObjects[]> {
  if (!parseDateFormat) {
    parseDateFormat = await prepareParseDateFormat()
  }

  return function maskPartReducer(
    aggregator: TextDisplayPartObjects[],
    currentPart: TextDisplayPart
  ) : TextDisplayPartObjects[] {
    const parsingStack: TextDisplayPart[] = [currentPart]
    let beingParsed: TextDisplayPart
    do {
      beingParsed = parsingStack.shift()!

    // Parse string formats, mostly top see if there is an expansion
      if (typeof beingParsed === 'string') {
        const expandedLiteral = parseLiteralShortCuts(beingParsed)
        if (expandedLiteral === null) {
          aggregator.push({
            type: COMPONENT_LITERAL,
            value: beingParsed
          })
          continue
        }
        parsingStack.unshift(...expandedLiteral)
        continue
      }

    // Parse simple types
      if (beingParsed.type === COMPONENT_LITERAL
        || beingParsed.type === TEXT_DISPLAY_TYPE_NUMBER
        || beingParsed.type === TEXT_DISPLAY_TYPE_TEXT) {
        aggregator.push(beingParsed)
        continue
      }

    // Parse predefined date component types
      const normalizedPart: TextDisplayPartObjects = {
        locale: beingParsed.locale ?? 'sv-SE',
        ...beingParsed
      }

      if (beingParsed.options && 'timeZone' in beingParsed?.options) {
        normalizedPart.timeZone = beingParsed?.options?.timeZone
      }

      switch (normalizedPart.type) {
        case COMPONENT_DAY:
        case COMPONENT_DAY_PERIOD:
        case COMPONENT_ERA:
        case COMPONENT_FRACTIONAL_SECOND:
        case COMPONENT_HOUR:
        case COMPONENT_INTERVAL:
        case COMPONENT_MINUTE:
        case COMPONENT_MONTH:
        case COMPONENT_SECOND:
        case COMPONENT_TIME_ZONE_NAME:
        case COMPONENT_WEEK:
        case COMPONENT_WEEKDAY:
        case COMPONENT_YEAR:
          aggregator.push(normalizedPart)
          continue
      }

    // Parse date format
      let partsToBeAdded : Array<ComponentDateTimeObjects | SveaComponentLiteral> = parseDateFormat(normalizedPart)
      const inheritedDateOptions : DateTimeOptions = beingParsed.options ?? {}
      const maskOptionsReducer = prepareMaskOptionsReducer(
        inheritedDateOptions,
        normalizedPart.locale!,
        normalizedPart.index,
        normalizedPart.timeZone
      )

      partsToBeAdded = partsToBeAdded.reduce(maskOptionsReducer, [])
      aggregator.push(...partsToBeAdded)
    } while (parsingStack[0])

    return aggregator
  }
}