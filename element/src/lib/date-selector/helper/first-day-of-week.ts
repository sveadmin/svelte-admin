export function prepareGetFirstDayOfWeek(weekStartsOn: number = 1) : (date: Date) => Date {
  return (date : Date) : Date => {
    const firstDayInCalendar = new Date(date.getTime()) //Make sure the timezone is correct...
    firstDayInCalendar.setUTCDate(date.getUTCDate() 
        - ((date.getDay() < weekStartsOn)
          ? date.getDay() + 7
          : date.getDay())
        + weekStartsOn)
    return firstDayInCalendar
  }
}

