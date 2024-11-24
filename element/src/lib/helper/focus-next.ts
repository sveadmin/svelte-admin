export const focusNext = (target: HTMLInputElement | undefined) => {
  if (!target 
    || target instanceof HTMLInputElement === false) {
    return
  }
  if (!target.form) {
    target.blur()
    return
  }
  let setFocus = false
  for (let next of target.form.elements) {
    if (setFocus
      && next instanceof HTMLInputElement) {
      setFocus = false
      next.focus()
    }
    if (next === target) {
      target.blur()
      setFocus = true
    }
  }
}