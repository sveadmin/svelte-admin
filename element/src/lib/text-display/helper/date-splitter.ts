import {
  TEXT_DISPLAY_TYPE_DAY,
  TEXT_DISPLAY_TYPE_DAY_PERIOD,
  TEXT_DISPLAY_TYPE_ERA,
  TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND,
  TEXT_DISPLAY_TYPE_HOUR,
  TEXT_DISPLAY_TYPE_MINUTE,
  TEXT_DISPLAY_TYPE_MONTH,
  TEXT_DISPLAY_TYPE_SECOND,
  TEXT_DISPLAY_TYPE_TIME_ZONE_NAME,
  TEXT_DISPLAY_TYPE_WEEKDAY,
  TEXT_DISPLAY_TYPE_YEAR,
} from '../types.js'

import type {
  TextDisplayPartObjects,
} from '../types.js'

export function dateSplitter(value: any, dynamicParts?: TextDisplayPartObjects[]) : any[]
{
  if (value instanceof Date === false) {
    value = new Date(value)
  }
  if (value instanceof Date === false) {
    return []
  }

  let dateNeeded = false,
    timeNeeded = false

  const dateTimeParts = dynamicParts?.filter((currentPart: TextDisplayPartObjects) => {
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
    }
    return false
  })

  const options: Intl.DateTimeFormatOptions = {}

  if (!options.dateStyle
    && dateNeeded) {
    options.dateStyle = 'short'
  }
  if (!options.timeStyle
    && timeNeeded) {
    options.timeStyle = 'medium'
  }

  const dateTimeFormat = new Intl.DateTimeFormat('sv', options)

  const formattedParts = dateTimeFormat.formatToParts(value)

  const mappedParts = formattedParts.reduce((aggregator: {[key: string] : Intl.DateTimeFormatPart}, currentPart) => {
    aggregator[currentPart.type] = currentPart
    return aggregator
  }, {})

  return dateTimeParts?.map((currentPart: TextDisplayPartObjects) => {
    return (mappedParts[currentPart.type])
      ? mappedParts[currentPart.type].value
      : ''
  }) ?? []
}