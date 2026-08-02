export function getAccordionClicked(eventTarget: HTMLElement | null) {
  if (!eventTarget) {
    return null
  }
  while (eventTarget && eventTarget.tagName !== "SVEAACCORDIONHEADER") {
    eventTarget = eventTarget.parentNode as HTMLElement;
  }
  return eventTarget;
}