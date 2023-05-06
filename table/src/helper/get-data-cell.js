export const getDataCellClicked = function (eventTarget) {
  while (eventTarget &&
    eventTarget.tagName !== 'DATACELL') {
    eventTarget = eventTarget.parentNode;
  }
  return eventTarget;
}