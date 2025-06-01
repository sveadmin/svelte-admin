export function isAtFirstCharacter (event: KeyboardEvent) {
  const target = event.target as HTMLInputElement
  return target.selectionStart === 0
    && target.selectionEnd === 0
}