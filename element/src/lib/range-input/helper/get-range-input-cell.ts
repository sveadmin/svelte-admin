export const getRangeInputCellClicked = function (eventTarget : HTMLElement) : HTMLElement {
  while (eventTarget &&
    eventTarget.tagName !== 'SVEARANGEINPUTBLOCK') {
    eventTarget = eventTarget.parentNode as HTMLElement;
  }
  return eventTarget;
}