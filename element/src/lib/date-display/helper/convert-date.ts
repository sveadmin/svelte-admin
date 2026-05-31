export const convertDate = (possibleDate: null | Date | string) => {
  if (possibleDate === null) {
    return null
  }
  return (possibleDate instanceof Date)
    ? possibleDate
    : new Date(possibleDate)
}