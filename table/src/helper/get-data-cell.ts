export const getDataCellClicked = function (eventTarget : HTMLElement) {
  while (eventTarget &&
    eventTarget.tagName !== 'DATACELL') {
    eventTarget = eventTarget.parentNode as HTMLElement;
  }
  return eventTarget;
}