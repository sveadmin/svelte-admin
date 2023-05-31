export const getDataCellClicked = function (eventTarget : HTMLElement) : HTMLElement {
  while (eventTarget &&
    eventTarget.tagName !== 'SVEADATACELL') {
    eventTarget = eventTarget.parentNode as HTMLElement;
  }
  return eventTarget;
}