export const focusPrevious = (target: HTMLInputElement | HTMLButtonElement | undefined) : HTMLInputElement | null => {
  if (!target) {
    return null
  }
  if (target instanceof HTMLInputElement === false
    && target instanceof HTMLButtonElement === false) {
    return null
  }
  if (!target.form) {
    console.warn('Can not focus previous form element. Wrap elements in form to enable focusing the previous one')
    target.blur()
    return null
  }
  let focusElement: HTMLInputElement | null = null
  for (let current of target.form.elements) {
    if (current === target
      && focusElement) {
      focusElement.focus()
      return focusElement
    }
    if (current instanceof HTMLInputElement
      && current.type !== 'hidden') {
      focusElement = current
    }
  }
  return null
}