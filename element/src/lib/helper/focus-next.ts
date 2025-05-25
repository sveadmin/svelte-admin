export const focusNext = (target: HTMLInputElement | undefined) : HTMLInputElement | null => {
  if (!target 
    || target instanceof HTMLInputElement === false) {
    return null
  }
  if (!target.form) {
    target.blur()
    return null
  }
  let setFocus = false
  for (let next of target.form.elements) {
    if (setFocus
      && next instanceof HTMLInputElement) {
      setFocus = false
      next.focus()
      return next
    }
    if (next === target) {
      target.blur()
      setFocus = true
    }
  }
  return null
}