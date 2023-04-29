import {
  getFirstDayOfMonth,
  prepareGetFirstDayOfWeek,
} from './index'

export function prepareGenerateDayGrid(weekStartsOn: number = 1) : (startDate: Date) => Date[][] {
  const getFirstDayOfWeek = prepareGetFirstDayOfWeek(weekStartsOn)
  return (selectedDate: Date) : Date[][] => {
    const firstDayOfMonth = getFirstDayOfMonth(selectedDate)
    const firstDayOfFirstWeek = getFirstDayOfWeek(firstDayOfMonth)
    return [...Array(6)].reduce(
      (aggregator, _, week) => {
        const firstDayOfWeek = new Date(firstDayOfFirstWeek.getTime())
        firstDayOfWeek.setUTCDate(firstDayOfWeek.getUTCDate() + week * 7)
        if (selectedDate.getUTCFullYear() * 16 + selectedDate.getUTCMonth() < firstDayOfWeek.getUTCFullYear() * 16 + firstDayOfWeek.getUTCMonth()) {
          return aggregator
        }
        aggregator.push([...Array(7)].map(
          (_, day) => {
            const currentDay = new Date(firstDayOfFirstWeek.getTime())
            currentDay.setUTCDate(currentDay.getUTCDate() + week * 7 + day)
            return currentDay
          }
        ))
        return aggregator
      },
      []
    )
  }
}