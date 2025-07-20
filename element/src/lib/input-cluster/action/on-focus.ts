export const prepareOnFocus = (inFocus: {value: boolean}, callback?: (event?: Event) => void) => {
  return (event?: Event) : void => {
    inFocus.value = true
    if (callback) {
      callback(event)
    }
  }
}