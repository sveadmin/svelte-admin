import {
  DATE_DAY_NUMERIC,
  DATE_MONTH_NUMERIC,
  DATE_WEEK_2DIGIT,
  DATE_WEEKDAY_NARROW,
  DATE_WEEKDAY_NUMERIC,
  TEXT_DISPLAY_TYPE_DAY,
  TEXT_DISPLAY_TYPE_DAY_PERIOD,
  TEXT_DISPLAY_TYPE_ERA,
  TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND,
  TEXT_DISPLAY_TYPE_HOUR,
  TEXT_DISPLAY_TYPE_MINUTE,
  TEXT_DISPLAY_TYPE_MONTH,
  TEXT_DISPLAY_TYPE_SECOND,
  TEXT_DISPLAY_TYPE_TIME_ZONE_NAME,
  TEXT_DISPLAY_TYPE_WEEK,
  TEXT_DISPLAY_TYPE_WEEKDAY,
  TEXT_DISPLAY_TYPE_YEAR,
  TIME_HOUR_NUMERIC,
  TIME_MINUTE_2DIGIT,
  TIME_MINUTE_NUMERIC,
  TIME_SECOND_2DIGIT,
  TIME_SECOND_NUMERIC,
  TIME_ZONE_NAME_REGION,
  TIME_ZONE_NAME_SHORT,
} from '../types.js'

import type {
  DateWeek,
  TextDisplayPartObjects,
} from '../types.js'

/**
 * From https://github.com/felixge/node-dateformat/blob/master/src/dateformat.js
 * Get the ISO 8601 week number
 * Based on comments from
 * http://techblog.procurios.nl/k/n618/news/view/33796/14863/Calculate-ISO-8601-week-and-year-in-javascript.html
 */
const getWeek = (date: Date) : number => {
  // Remove time components of date
  const targetThursday = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  // Change date to Thursday same week
  targetThursday.setDate(
    targetThursday.getDate() - ((targetThursday.getDay() + 6) % 7) + 3
  );

  // Take January 4th as it is always in week 1 (see ISO 8601)
  const firstThursday = new Date(targetThursday.getFullYear(), 0, 4);

  // Change date to Thursday same week
  firstThursday.setDate(
    firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3
  );

  // Check if daylight-saving-time-switch occurred and correct for it
  const ds =
    targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
  targetThursday.setHours(targetThursday.getHours() - ds);

  // Number of weeks between target Thursday and first Thursday
  const weekDiff = (targetThursday - firstThursday) / (86400000 * 7);
  return 1 + Math.floor(weekDiff);
}

export function dateSplitter(value: any, dynamicParts?: TextDisplayPartObjects[]) : any[]
{
  if (value instanceof Date === false) {
    value = new Date(value)
  }
  if (value instanceof Date === false) {
    return []
  }

  let dateNeeded = false,
    timeNeeded = false,
    weekNeeded: DateWeek | undefined

  let options: Intl.DateTimeFormatOptions = {}
  let locale: string | undefined
  let timeZone: string | undefined

  const dateTimeParts = dynamicParts?.filter((currentPart: TextDisplayPartObjects) => {
    locale = locale || currentPart?.locale || 'sv'
    timeZone = timeZone || currentPart?.timeZone

    switch (true) {
      case currentPart.type === TEXT_DISPLAY_TYPE_DAY_PERIOD:
        break
      case currentPart.type === TEXT_DISPLAY_TYPE_WEEKDAY
        && currentPart.options?.weekday === DATE_WEEKDAY_NUMERIC:
        options.weekday = DATE_WEEKDAY_NARROW
        break
      case currentPart.type === TEXT_DISPLAY_TYPE_TIME_ZONE_NAME
        && currentPart.options?.timeZoneName === TIME_ZONE_NAME_REGION:
        options.timeZoneName = TIME_ZONE_NAME_SHORT
        break
      default:
        if (currentPart.hasOwnProperty('options')) {
          options = {...currentPart?.options, ...options}
        }
    }
    switch (currentPart.type) {
      case TEXT_DISPLAY_TYPE_DAY:
      case TEXT_DISPLAY_TYPE_ERA:
      case TEXT_DISPLAY_TYPE_MONTH:
      case TEXT_DISPLAY_TYPE_WEEKDAY:
      case TEXT_DISPLAY_TYPE_YEAR:
        dateNeeded = true
        return true
      case TEXT_DISPLAY_TYPE_DAY_PERIOD:
      case TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND:
      case TEXT_DISPLAY_TYPE_HOUR:
      case TEXT_DISPLAY_TYPE_MINUTE:
      case TEXT_DISPLAY_TYPE_SECOND:
      case TEXT_DISPLAY_TYPE_TIME_ZONE_NAME:
        timeNeeded = true
        return true
      case TEXT_DISPLAY_TYPE_WEEK:
        weekNeeded = currentPart?.options?.week
        return true
    }
    return false
  })

  if (timeZone) {
    options.timeZone = timeZone
  }

  if (Object.keys(options).length === 1) {
    //This fixes an issue with minute settings: 2-digit is not fuinction in Chrome, the only way to get the 2 digit values of these is to set timeStyle: medium
    if (options?.minute === TIME_MINUTE_2DIGIT) {
      options = {}
    }
    if (options?.second === TIME_SECOND_2DIGIT) {
      options = {}
    }
  }
  if (Object.keys(options).length === 0) {
    if (dateNeeded) {
      options.dateStyle = 'short'
    }
    if (timeNeeded) {
      options.timeStyle = 'medium'
    }
  }
  const dateTimeFormat = new Intl.DateTimeFormat(locale, options)

  const formattedParts = dateTimeFormat.formatToParts(value)

  const mappedParts = formattedParts.reduce((aggregator: {[key: string] : Intl.DateTimeFormatPart}, currentPart) => {
    aggregator[currentPart.type] = currentPart
    return aggregator
  }, {})

  if (weekNeeded) {
    mappedParts[TEXT_DISPLAY_TYPE_WEEK] = {type: 'unknown', value: ''}
  }

  return dateTimeParts?.map((currentPart: TextDisplayPartObjects) => {
    if (!mappedParts[currentPart.type]) {
      return ''
    }
    if (currentPart.type === TEXT_DISPLAY_TYPE_DAY_PERIOD) {
      const value = (currentPart?.options?.lowerCase)
        ? mappedParts[currentPart.type].value.toLocaleLowerCase()
        : mappedParts[currentPart.type].value
      return (currentPart?.options?.dayPeriod === 'narrow')
        ? value.substring(0, 1)
        : value
    }
    if ((currentPart.type === TEXT_DISPLAY_TYPE_MONTH && currentPart?.options?.month === DATE_MONTH_NUMERIC)
      || (currentPart.type === TEXT_DISPLAY_TYPE_DAY && currentPart?.options?.day === DATE_DAY_NUMERIC)
      || (currentPart.type === TEXT_DISPLAY_TYPE_HOUR && currentPart?.options?.hour === TIME_HOUR_NUMERIC)
      || (currentPart.type === TEXT_DISPLAY_TYPE_MINUTE && currentPart?.options?.minute === TIME_MINUTE_NUMERIC)
      || (currentPart.type === TEXT_DISPLAY_TYPE_SECOND && currentPart?.options?.second === TIME_SECOND_NUMERIC)) {
      //This fixes a fallback issue in Chrome, where any definition which includes more than one piece of the time / date will return 2-digit anyways
      const value = mappedParts[currentPart.type].value
      return (value[0] === '0')
        ? value.substring(1)
        : value
    }
    if (currentPart.type === TEXT_DISPLAY_TYPE_WEEKDAY
      && currentPart.options?.weekday === DATE_WEEKDAY_NUMERIC
    ) {
      return value.getDay()
    }
    if (currentPart.type === TEXT_DISPLAY_TYPE_TIME_ZONE_NAME
      && currentPart.options?.timeZoneName === TIME_ZONE_NAME_REGION
    ) {
      return dateTimeFormat.resolvedOptions().timeZone
    }
    if (currentPart.type === TEXT_DISPLAY_TYPE_WEEK) {
      const weekNumber = getWeek(value).toString()
      return (currentPart.options?.week === DATE_WEEK_2DIGIT)
        ? '0'.substring(0,2-weekNumber.length) + weekNumber
        : weekNumber
    }
    return mappedParts[currentPart.type].value
  }) ?? []
}