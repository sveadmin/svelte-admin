export function preventRepeat (event: KeyboardEvent){
  if (event.repeat) {
    event.preventDefault()
    return false
  }
  return true
}