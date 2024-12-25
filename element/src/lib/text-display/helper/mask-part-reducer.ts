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
  TextDisplayPartObjects,
  TextDisplayPartTime,
  TextDisplayType,
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
      ...currentPart
    }

    if (currentPart?.options?.timeZone) {
      normalizedPart.timeZone = currentPart?.options?.timeZone
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
      case TEXT_DISPLAY_TYPE_WEEK:
      case TEXT_DISPLAY_TYPE_WEEKDAY:
      case TEXT_DISPLAY_TYPE_YEAR:
        aggregator.push(normalizedPart)
        return aggregator
    }

    currentPart = currentPart as TextDisplayPartDate | TextDisplayPartDateTime | TextDisplayPartTime
    const partsToBeAdded : TextDisplayPartObjects[] = parseDateFormat(normalizedPart)

    partsToBeAdded.map(currentNewPart => {
      if (currentNewPart.type === TEXT_DISPLAY_TYPE_LITERAL) {
        aggregator.push({type: currentNewPart.type, value: currentNewPart.value})
        return
      }

      let newPartToBeAdded: TextDisplayPartDateTimeObjects = {
        locale: normalizedPart.locale,
        type: currentNewPart.type,
      }
      if (normalizedPart.timeZone) {
        newPartToBeAdded.timeZone = normalizedPart.timeZone
      }

      let tempOptions: DateTimeOptions = {}
      switch (currentNewPart.type) {
        case TEXT_DISPLAY_TYPE_DAY:
          const day = currentPart.type !== TEXT_DISPLAY_TYPE_TIME && currentPart?.options?.day || currentNewPart?.options?.day
          if (day) {
            newPartToBeAdded.options = {day}
          }
          break
        case TEXT_DISPLAY_TYPE_DAY_PERIOD:
          tempOptions = {}
          const dayPeriod = currentPart.type !== TEXT_DISPLAY_TYPE_DATE && currentPart?.options?.dayPeriod || currentNewPart?.options?.dayPeriod
          if (dayPeriod) {
            tempOptions.dayPeriod = dayPeriod
          }
          const lowerCase = currentPart.type !== TEXT_DISPLAY_TYPE_DATE && currentPart?.options?.lowerCase || currentNewPart?.options?.lowerCase
          if (lowerCase) {
            tempOptions.lowerCase = lowerCase
          }
          if (Object.keys(tempOptions).length > 0) {
            newPartToBeAdded.options = tempOptions
          }
          break
        case TEXT_DISPLAY_TYPE_ERA:
          if (currentPart.type !== TEXT_DISPLAY_TYPE_TIME
            && currentPart?.options?.era) {
            newPartToBeAdded.options = {era: currentPart?.options?.era}
          }
          break
        case TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND:
          const fractionalSecondDigits = currentPart.type !== TEXT_DISPLAY_TYPE_DATE && currentPart?.options?.fractionalSecondDigits || currentNewPart?.options?.fractionalSecondDigits
          if (fractionalSecondDigits) {
            newPartToBeAdded.options = {fractionalSecondDigits}
          }
          break
        case TEXT_DISPLAY_TYPE_HOUR:
          tempOptions = {}
          const hour = currentPart.type !== TEXT_DISPLAY_TYPE_DATE && currentPart?.options?.hour || currentNewPart?.options?.hour
          if (hour) {
            tempOptions.hour = hour
          }
          let hour12: boolean | null = null
          if (currentPart.type !== TEXT_DISPLAY_TYPE_DATE 
            && typeof currentPart?.options?.hour12 === 'boolean') {
            hour12 = currentPart?.options?.hour12
          }
          if (hour12 === null
            && typeof currentNewPart?.options?.hour12 === 'boolean'
          ) {
            hour12 = currentNewPart?.options?.hour12
          }
          if (typeof hour12 === 'boolean') {
            tempOptions.hour12 = hour12
          }
          const hourCycle = currentPart.type !== TEXT_DISPLAY_TYPE_DATE && currentPart?.options?.hourCycle || currentNewPart?.options?.hourCycle
          if (hourCycle) {
            tempOptions.hourCycle = hourCycle
          }
          if (Object.keys(tempOptions).length > 0) {
            newPartToBeAdded.options = tempOptions
          }
          break
        case TEXT_DISPLAY_TYPE_MINUTE:
          const minute = currentPart.type !== TEXT_DISPLAY_TYPE_DATE && currentPart?.options?.minute || currentNewPart?.options?.minute
          if (minute) {
            newPartToBeAdded.options = {minute}
          }
          break
        case TEXT_DISPLAY_TYPE_MONTH:
          const month = currentPart.type !== TEXT_DISPLAY_TYPE_TIME && currentPart?.options?.month || currentNewPart?.options?.month
          if (month) {
            newPartToBeAdded.options = {month}
          }
          break
        case TEXT_DISPLAY_TYPE_SECOND:
          const second = currentPart.type !== TEXT_DISPLAY_TYPE_DATE && currentPart?.options?.second || currentNewPart?.options?.second
          if (second) {
            newPartToBeAdded.options = {second}
          }
          break
        case TEXT_DISPLAY_TYPE_TIME_ZONE_NAME:
          const timeZoneName = currentPart.type !== TEXT_DISPLAY_TYPE_DATE && currentPart?.options?.timeZoneName || currentNewPart?.options?.timeZoneName
          if (timeZoneName) {
            newPartToBeAdded.options = {timeZoneName}
          }
          break
        case TEXT_DISPLAY_TYPE_WEEK:
          const week = currentPart.type !== TEXT_DISPLAY_TYPE_TIME && currentPart?.options?.week || currentNewPart?.options?.week
          if (week) {
            newPartToBeAdded.options = {week}
          }
          break
        case TEXT_DISPLAY_TYPE_WEEKDAY:
          const weekday = currentPart.type !== TEXT_DISPLAY_TYPE_TIME && currentPart?.options?.weekday || currentNewPart?.options?.weekday
          if (weekday) {
            newPartToBeAdded.options = {weekday}
          }
          break
        case TEXT_DISPLAY_TYPE_YEAR:
          const year = currentPart.type !== TEXT_DISPLAY_TYPE_TIME && currentPart?.options?.year || currentNewPart?.options?.year
          if (year) {
            newPartToBeAdded.options = {year}
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