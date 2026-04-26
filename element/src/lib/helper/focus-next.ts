export const focusNext = (target: HTMLInputElement | undefined) : HTMLInputElement | null => {
  if (!target 
    || target instanceof HTMLInputElement === false) {
    return null
  }
  if (!target.form) {
    console.warn('Can not focus next form element. Wrap elements in form to enable focusing the next one')
    target.blur()
    return null
  }
  let setFocus = false
  for (let next of target.form.elements) {
    if (setFocus
      && next instanceof HTMLInputElement
      && next.type !== 'hidden') {
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