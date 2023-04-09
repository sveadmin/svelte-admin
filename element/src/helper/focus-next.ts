export const focusNext = (target: HTMLFormElement) => {
  if (!target.form) {
    target.blur()
    return
  }
  let setFocus = false
  for (let next of target.form.elements) {
    if (setFocus) {
      setFocus = false
      next.focus()
    }
    if (next === target) {
      setFocus = true
    }
  }
}