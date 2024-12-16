import {
  TEXT_DISPLAY_TYPE_DATE,
  TEXT_DISPLAY_TYPE_DATE_TIME,
  TEXT_DISPLAY_TYPE_DAY,
  TEXT_DISPLAY_TYPE_DAY_PERIOD,
  TEXT_DISPLAY_TYPE_ERA,
  TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND,
  TEXT_DISPLAY_TYPE_HOUR,
  TEXT_DISPLAY_TYPE_LITERAL,
  TEXT_DISPLAY_TYPE_MINUTE,
  TEXT_DISPLAY_TYPE_MONTH,
  TEXT_DISPLAY_TYPE_NUMBER,
  TEXT_DISPLAY_TYPE_SECOND,
  TEXT_DISPLAY_TYPE_TEXT,
  TEXT_DISPLAY_TYPE_TIME,
  TEXT_DISPLAY_TYPE_TIME_ZONE_NAME,
  TEXT_DISPLAY_TYPE_WEEKDAY, 
  TEXT_DISPLAY_TYPE_YEAR,
} from '../types.js'

import type {
  DateTimeOptions,
  TextDisplayPart,
  TextDisplayPartObjects,
  TextDisplayPartDateTimeObjects,
} from '../types.js'

import {
  parseMaskString,
} from './parse-mask-string.js'

export function maskPartReducer(aggregator: TextDisplayPartObjects[], currentPart: TextDisplayPart) : TextDisplayPartObjects[] {
  if (typeof currentPart === 'string') {
    aggregator.push(parseMaskString(currentPart))
    return aggregator
  }

  if (currentPart.type === TEXT_DISPLAY_TYPE_LITERAL
    || currentPart.type === TEXT_DISPLAY_TYPE_NUMBER
    || currentPart.type === TEXT_DISPLAY_TYPE_TEXT) {
    aggregator.push(currentPart)
    return aggregator
    
  }

  const locale = currentPart.locale ?? 'sv'
  const timeZone = currentPart.timeZone ?? 'UTC'
  switch (currentPart.type) {
    case TEXT_DISPLAY_TYPE_DAY:
    case TEXT_DISPLAY_TYPE_DAY_PERIOD:
    case TEXT_DISPLAY_TYPE_ERA:
    case TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND:
    case TEXT_DISPLAY_TYPE_HOUR:
    case TEXT_DISPLAY_TYPE_MINUTE:
    case TEXT_DISPLAY_TYPE_MONTH:
    case TEXT_DISPLAY_TYPE_SECOND:
    case TEXT_DISPLAY_TYPE_TIME_ZONE_NAME:
    case TEXT_DISPLAY_TYPE_WEEKDAY:
    case TEXT_DISPLAY_TYPE_YEAR:
      aggregator.push({locale, timeZone, ...currentPart})
      return aggregator
  }

  let dateTimeFormat : Intl.DateTimeFormat | null = null

  if (currentPart.type === TEXT_DISPLAY_TYPE_DATE) {
    dateTimeFormat = new Intl.DateTimeFormat(
      locale,
      currentPart.options ?? {dateStyle: 'short', timeStyle: undefined}
    )
  }
  if (currentPart.type === TEXT_DISPLAY_TYPE_DATE_TIME) {
    dateTimeFormat = new Intl.DateTimeFormat(
      locale,
      currentPart.options ?? {dateStyle: 'short', timeStyle: 'medium', hour12: false}
    )
  }
  if (currentPart.type === TEXT_DISPLAY_TYPE_TIME) {
    dateTimeFormat = new Intl.DateTimeFormat(
      locale,
      currentPart.options ?? {dateStyle: undefined, timeStyle: 'medium', hour12: false}
    )
  }
  if (!dateTimeFormat) {
    return aggregator
  }

  const partsToBeAdded : Intl.DateTimeFormatPart[] = dateTimeFormat.formatToParts()

  partsToBeAdded.map(currentNewPart => {
    if (currentNewPart.type === 'unknown') {
      return
    }
    if (currentNewPart.type === TEXT_DISPLAY_TYPE_LITERAL) {
      aggregator.push({type: currentNewPart.type, value: currentNewPart.value})
      return
    }

    let newPartToBeAdded: TextDisplayPartDateTimeObjects = {
      locale,
      timeZone,
      type: currentNewPart.type,
    }

    let tempOptions: DateTimeOptions = {}
    switch (currentNewPart.type) {
      case TEXT_DISPLAY_TYPE_DAY:
        if (currentPart.type !== TEXT_DISPLAY_TYPE_TIME
          && currentPart?.options?.day) {
          newPartToBeAdded.options = {day: currentPart?.options?.day}
        }
        break
      case TEXT_DISPLAY_TYPE_DAY_PERIOD:
        if (currentPart.type !== TEXT_DISPLAY_TYPE_DATE
          && currentPart?.options?.dayPeriod) {
          newPartToBeAdded.options = {dayPeriod: currentPart?.options?.dayPeriod}
        }
        break
      case TEXT_DISPLAY_TYPE_ERA:
        if (currentPart.type !== TEXT_DISPLAY_TYPE_TIME
          && currentPart?.options?.era) {
          newPartToBeAdded.options = {era: currentPart?.options?.era}
        }
        break
      case TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND:
        if (currentPart.type !== TEXT_DISPLAY_TYPE_DATE
          && currentPart?.options?.fractionalSecondDigits) {
          newPartToBeAdded.options = {fractionalSecondDigits: currentPart?.options?.fractionalSecondDigits}
        }
        break
      case TEXT_DISPLAY_TYPE_HOUR:
        tempOptions = {}
        if (currentPart.type !== TEXT_DISPLAY_TYPE_DATE
          && currentPart?.options?.hour) {
          tempOptions.hour = currentPart?.options?.hour
        }
        if (currentPart.type !== TEXT_DISPLAY_TYPE_DATE
          && typeof currentPart?.options?.hour12 === 'boolean') {
          tempOptions.hour12 = currentPart?.options?.hour12
        }
        if (currentPart.type !== TEXT_DISPLAY_TYPE_DATE
          && currentPart?.options?.hourCycle) {
          tempOptions.hourCycle = currentPart?.options?.hourCycle
        }
        if (Object.keys(tempOptions).length > 0) {
          newPartToBeAdded.options = tempOptions
        }
        break
      case TEXT_DISPLAY_TYPE_MINUTE:
        if (currentPart.type !== TEXT_DISPLAY_TYPE_DATE
          && currentPart?.options?.minute) {
          newPartToBeAdded.options = {minute: currentPart?.options?.minute}
        }
        break
      case TEXT_DISPLAY_TYPE_MONTH:
        if (currentPart.type !== TEXT_DISPLAY_TYPE_TIME
          && currentPart?.options?.month) {
          newPartToBeAdded.options = {month: currentPart?.options?.month}
        }
        break
      case TEXT_DISPLAY_TYPE_SECOND:
        if (currentPart.type !== TEXT_DISPLAY_TYPE_DATE
          && currentPart?.options?.second) {
          newPartToBeAdded.options = {second: currentPart?.options?.second}
        }
        break
      case TEXT_DISPLAY_TYPE_TIME_ZONE_NAME:
        if (currentPart.type !== TEXT_DISPLAY_TYPE_DATE
          && currentPart?.options?.timeZoneName) {
          newPartToBeAdded.options = {timeZoneName: currentPart?.options?.timeZoneName}
        }
        break
      case TEXT_DISPLAY_TYPE_WEEKDAY:
        if (currentPart.type !== TEXT_DISPLAY_TYPE_TIME
          && currentPart?.options?.weekday) {
          newPartToBeAdded.options = {weekday: currentPart?.options?.weekday}
        }
        break
      case TEXT_DISPLAY_TYPE_YEAR:
        if (currentPart.type !== TEXT_DISPLAY_TYPE_TIME
          && currentPart?.options?.year) {
          newPartToBeAdded.options = {year: currentPart?.options?.year}
        }
        break
      default:
        return
    }
    aggregator.push(newPartToBeAdded)
  })

  return aggregator
}