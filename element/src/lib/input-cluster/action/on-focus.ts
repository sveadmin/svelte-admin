export const prepareOnFocus = (inFocus: {value: boolean}) => {
  return (event?: Event) : boolean => {
    inFocus.value = true
    return true
  }
}