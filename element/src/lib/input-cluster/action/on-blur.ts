export const prepareOnBlur = (inFocus: {value: boolean}) => {
  return (event?: Event) : boolean => {
    inFocus.value = false
    return true
  }
}