import {
  TEXT_DISPLAY_TYPE_DATE,
  TEXT_DISPLAY_TYPE_DAY,
  TEXT_DISPLAY_TYPE_DAY_PERIOD,
  TEXT_DISPLAY_TYPE_ERA,
  TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND,
  TEXT_DISPLAY_TYPE_HOUR,
  TEXT_DISPLAY_TYPE_INTERVAL,
  TEXT_DISPLAY_TYPE_LITERAL,
  TEXT_DISPLAY_TYPE_MINUTE,
  TEXT_DISPLAY_TYPE_MONTH,
  TEXT_DISPLAY_TYPE_NUMBER,
  TEXT_DISPLAY_TYPE_SECOND,
  TEXT_DISPLAY_TYPE_TEXT,
  TEXT_DISPLAY_TYPE_TIME,
  TEXT_DISPLAY_TYPE_TIME_ZONE_NAME,
  TEXT_DISPLAY_TYPE_WEEK,
  TEXT_DISPLAY_TYPE_WEEKDAY, 
  TEXT_DISPLAY_TYPE_YEAR,
} from '../types.js'

import type {
  DateTimeOptions,
  TextDisplayPart,
  TextDisplayPartDate,
  TextDisplayPartDateTime,
  TextDisplayPartDateTimeObjects,
  TextDisplayPartLiteral,
  TextDisplayPartObjects,
  TextDisplayPartTime,
} from '../types.js'

import {
  prepareParseDateFormat,
} from './parse-date-format.js'

import {
  prepareMaskOptionsReducer,
} from './mask-options-reducer.js'

import {
  parseLiteralShortCuts,
} from './parse-literal-shortcuts.js'

export async function prepareMaskPartReducer(parseDateFormat?: (
  maskPart: TextDisplayPartDate | TextDisplayPartDateTime | TextDisplayPartTime) => Array<TextDisplayPartDateTimeObjects | TextDisplayPartLiteral>
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
            type: TEXT_DISPLAY_TYPE_LITERAL,
            value: beingParsed
          })
          continue
        }
        parsingStack.unshift(...expandedLiteral)
        continue
      }

    // Parse simple types
      if (beingParsed.type === TEXT_DISPLAY_TYPE_LITERAL
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
        case TEXT_DISPLAY_TYPE_DAY:
        case TEXT_DISPLAY_TYPE_DAY_PERIOD:
        case TEXT_DISPLAY_TYPE_ERA:
        case TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND:
        case TEXT_DISPLAY_TYPE_HOUR:
        case TEXT_DISPLAY_TYPE_INTERVAL:
        case TEXT_DISPLAY_TYPE_MINUTE:
        case TEXT_DISPLAY_TYPE_MONTH:
        case TEXT_DISPLAY_TYPE_SECOND:
        case TEXT_DISPLAY_TYPE_TIME_ZONE_NAME:
        case TEXT_DISPLAY_TYPE_WEEK:
        case TEXT_DISPLAY_TYPE_WEEKDAY:
        case TEXT_DISPLAY_TYPE_YEAR:
          aggregator.push(normalizedPart)
          continue
      }

    // Parse date format
      const partsToBeAdded : Array<TextDisplayPartDateTimeObjects | TextDisplayPartLiteral> = parseDateFormat(normalizedPart)
      const inheritedDateOptions : DateTimeOptions = beingParsed.options ?? {}
      const maskOptionsReducer = prepareMaskOptionsReducer(
        inheritedDateOptions,
        normalizedPart.locale!,
        normalizedPart.index,
        normalizedPart.timeZone
      )

      partsToBeAdded.reduce(maskOptionsReducer, aggregator)
    } while (parsingStack[0])

    return aggregator
  }
}