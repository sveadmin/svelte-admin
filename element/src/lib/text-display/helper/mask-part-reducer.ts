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
  TextDisplayPartDate,
  TextDisplayPartDateTime,
  TextDisplayPartDateTimeObjects,
  TextDisplayPartObjects,
  TextDisplayPartTime,
} from '../types.js'

import {
  prepareParseDateFormat,
} from './parse-date-format.js'

export async function prepareMaskPartReducer(parseDateFormat?: (
  maskPart: TextDisplayPartDate | TextDisplayPartDateTime | TextDisplayPartTime) => TextDisplayPartObjects[]
) : Promise<(aggregator: TextDisplayPartObjects[], currentPart: TextDisplayPart) => TextDisplayPartObjects[]> {
  if (!parseDateFormat) {
    parseDateFormat = await prepareParseDateFormat()
  }

  return function maskPartReducer(
    aggregator: TextDisplayPartObjects[],
    currentPart: TextDisplayPart
  ) : TextDisplayPartObjects[] {
    if (typeof currentPart === 'string') {
      aggregator.push({
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: currentPart
      })
      return aggregator
    }

    if (currentPart.type === TEXT_DISPLAY_TYPE_LITERAL
      || currentPart.type === TEXT_DISPLAY_TYPE_NUMBER
      || currentPart.type === TEXT_DISPLAY_TYPE_TEXT) {
      aggregator.push(currentPart)
      return aggregator
      
    }

    const normalizedPart = {
      locale: currentPart.locale ?? 'sv',
      timeZone: currentPart.timeZone ?? 'UTC',
      ...currentPart
    }

    switch (normalizedPart.type) {
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
        aggregator.push(normalizedPart)
        return aggregator
    }

    currentPart = currentPart as TextDisplayPartDate | TextDisplayPartDateTime | TextDisplayPartTime
    const partsToBeAdded : TextDisplayPartObjects[] = parseDateFormat(normalizedPart)

    partsToBeAdded.map(currentNewPart => {
      // if (currentNewPart.type === 'unknown') {
      //   return
      // }
      if (currentNewPart.type === TEXT_DISPLAY_TYPE_LITERAL) {
        aggregator.push({type: currentNewPart.type, value: currentNewPart.value})
        return
      }

      let newPartToBeAdded: TextDisplayPartDateTimeObjects = {
        locale: normalizedPart.locale,
        timeZone: normalizedPart.timeZone,
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
}