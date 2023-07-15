export const focusNext = (target: HTMLInputElement) => {
  if (!target.form) {
    target.blur()
    return
  }
  let setFocus = false
  for (let next of target.form.elements) {
    if (setFocus
      && next instanceof HTMLInputElement) {
    console.log('nexteteklem', next)
      setFocus = false
      next.focus()
    }
    if (next === target) {
      setFocus = true
    }
  }
}