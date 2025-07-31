export function isAtLastCharacter (event: KeyboardEvent) {
  const target = event.target as HTMLInputElement
  return target.selectionStart === target.value.length
    && target.selectionEnd === target.value.length
}