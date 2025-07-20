export const prepareOnBlur = (inFocus: {value: boolean}, callback?: (event?: Event) => void) => {
  return (event?: Event) : void => {
    inFocus.value = false
    if (callback) {
      callback(event)
    }
  }
}