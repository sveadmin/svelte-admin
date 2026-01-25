import {
  DATE_WEEKDAY_DELTA_LONG,
  DATE_WEEKDAY_DELTA_SHORT,
  DATE_WEEKDAY_DELTA_TDY,
  DATE_WEEKDAY_DELTA_TODAY,
  DATE_WEEKDAY_DELTA_TMW,
  DATE_WEEKDAY_DELTA_TOMORROW,
  DATE_WEEKDAY_DELTA_YESTERDAY,
  DATE_WEEKDAY_DELTA_YSD,
} from '../weekday-types.js'

export const getNeighbourDates = (date: Date, format: typeof DATE_WEEKDAY_DELTA_LONG | typeof DATE_WEEKDAY_DELTA_SHORT = DATE_WEEKDAY_DELTA_LONG) : typeof DATE_WEEKDAY_DELTA_TDY | typeof DATE_WEEKDAY_DELTA_TMW | typeof  DATE_WEEKDAY_DELTA_YSD | typeof DATE_WEEKDAY_DELTA_TODAY | typeof DATE_WEEKDAY_DELTA_TOMORROW | typeof DATE_WEEKDAY_DELTA_YESTERDAY | null => {
  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)

  switch (true) {
    case today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth() && today.getDate() === date.getDate():
      return (format === DATE_WEEKDAY_DELTA_LONG) ? DATE_WEEKDAY_DELTA_TODAY : DATE_WEEKDAY_DELTA_TDY
    case tomorrow.getFullYear() === date.getFullYear() && tomorrow.getMonth() === date.getMonth() && tomorrow.getDate() === date.getDate():
      return (format === DATE_WEEKDAY_DELTA_LONG) ? DATE_WEEKDAY_DELTA_TOMORROW : DATE_WEEKDAY_DELTA_TMW
    case yesterday.getFullYear() === date.getFullYear() && yesterday.getMonth() === date.getMonth() && yesterday.getDate() === date.getDate():
      return (format === DATE_WEEKDAY_DELTA_LONG) ? DATE_WEEKDAY_DELTA_YESTERDAY : DATE_WEEKDAY_DELTA_YSD
  }

  return null
}