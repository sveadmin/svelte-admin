export const focusPrevious = (target: HTMLInputElement | HTMLButtonElement | undefined) : HTMLInputElement | null => {
  if (!target) {
    return null
  }
  if (target instanceof HTMLInputElement === false
    && target instanceof HTMLButtonElement === false) {
    return null
  }
  if (!target.form) {
    target.blur()
    return null
  }
  let focusElement: HTMLInputElement | null = null
  for (let next of target.form.elements) {
    if (next === target
      && focusElement) {
      focusElement.focus()
      return focusElement
    }
    if (next instanceof HTMLInputElement) {
      focusElement = next
    }
  }
  return null
}