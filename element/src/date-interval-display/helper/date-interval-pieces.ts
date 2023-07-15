import {
  DateIntervalPieces,
  DateIntervalPiecesData,
} from '../types.js'

export function dateIntervalPieces(value: number) : DateIntervalPieces {
  const dateIntervalPieces: DateIntervalPiecesData = {}

  dateIntervalPieces.seconds = value
  dateIntervalPieces.minutes = dateIntervalPieces.seconds / 60
  dateIntervalPieces.hours = dateIntervalPieces.minutes / 60
  dateIntervalPieces.days = dateIntervalPieces.hours / 24
  dateIntervalPieces.weeks = dateIntervalPieces.days / 7
  dateIntervalPieces.months = dateIntervalPieces.days / 30
  dateIntervalPieces.years = dateIntervalPieces.months / 12

  dateIntervalPieces.monthsRemainder = dateIntervalPieces.months - Math.floor(dateIntervalPieces.years) * 12
  dateIntervalPieces.daysRemainder = dateIntervalPieces.days - Math.floor(dateIntervalPieces.months) * 30
  dateIntervalPieces.hoursRemainder = dateIntervalPieces.hours - Math.floor(dateIntervalPieces.days) * 24
  dateIntervalPieces.minutesRemainder = dateIntervalPieces.minutes - Math.floor(dateIntervalPieces.hours) * 24
  dateIntervalPieces.secondsRemainder = dateIntervalPieces.seconds - Math.floor(dateIntervalPieces.minutes) * 60

  return {
    days: (isExactValueNeeded = false) => (isExactValueNeeded) ? dateIntervalPieces.days : Math.floor(dateIntervalPieces.days),
    daysRemainder: (isExactValueNeeded = false) => (isExactValueNeeded) ? dateIntervalPieces.daysRemainder : Math.floor(dateIntervalPieces.daysRemainder),
    hours: (isExactValueNeeded = false) => (isExactValueNeeded) ? dateIntervalPieces.hours : Math.floor(dateIntervalPieces.hours),
    hoursRemainder: (isExactValueNeeded = false) => (isExactValueNeeded) ? dateIntervalPieces.hoursRemainder : Math.floor(dateIntervalPieces.hoursRemainder),
    minutes: (isExactValueNeeded = false) => (isExactValueNeeded) ? dateIntervalPieces.minutes : Math.floor(dateIntervalPieces.minutes),
    minutesRemainder: (isExactValueNeeded = false) => (isExactValueNeeded) ? dateIntervalPieces.minutesRemainder : Math.floor(dateIntervalPieces.minutesRemainder),
    seconds: (isExactValueNeeded = false) => (isExactValueNeeded) ? dateIntervalPieces.seconds : Math.floor(dateIntervalPieces.seconds),
    secondsRemainder: (isExactValueNeeded = false) => (isExactValueNeeded) ? dateIntervalPieces.secondsRemainder : Math.floor(dateIntervalPieces.secondsRemainder),
    weeks: (isExactValueNeeded = false) => (isExactValueNeeded) ? dateIntervalPieces.weeks : Math.floor(dateIntervalPieces.weeks),
    months: (isExactValueNeeded = false) => (isExactValueNeeded) ? dateIntervalPieces.months : Math.floor(dateIntervalPieces.months),
    monthsRemainder: (isExactValueNeeded = false) => (isExactValueNeeded) ? dateIntervalPieces.monthsRemainder : Math.floor(dateIntervalPieces.monthsRemainder),
    years: (isExactValueNeeded = false) => (isExactValueNeeded) ? dateIntervalPieces.years : Math.floor(dateIntervalPieces.years),
  }
}