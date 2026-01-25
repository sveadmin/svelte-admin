export function allowSwitch (event?: KeyboardEvent) {
  if (event?.key !== 'Enter') {
    event?.stopPropagation()
    return false //This is supposed to be the last action chained, it is okay to stop further chained events
  }
  return true
}