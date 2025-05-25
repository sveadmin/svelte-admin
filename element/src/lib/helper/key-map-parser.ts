import type {
  KeyMap,
  ParsedKeyMap,
} from '$lib/types.js'

export const keyMapParser = (keyMap: KeyMap | {[key: string] : ParsedKeyMap}, triggerOnKeydown: boolean = false) : ParsedKeyMap[] => {
  return Object.keys(keyMap).reduce(
    (aggregator: ParsedKeyMap[], key: string) => {
      let altKey: boolean = false,
        ctrlKey: boolean = false,
        keyPieces: string[],
        metaKey: boolean = false,
        pureKey: string | null = null,
        onAllModifiers: boolean = false,
        onKeydown: boolean = false,
        shiftKey: boolean = false
      if (key !== '_'
        && key !== '+') {
        onKeydown = key.indexOf('_') === 0
        keyPieces = key.split(/[_\+]/)
        keyPieces.forEach(currentKeyPiece => {
          switch (currentKeyPiece) {
            case '*':
              onAllModifiers = true
              break
            case 'alt':
            case 'Alt':
            case 'ALT':
              altKey = true
              break
            case 'ctrl':
            case 'Ctrl':
            case 'CTRL':
              ctrlKey = true
              break
            case 'meta':
            case 'Meta':
            case 'META':
              metaKey = true
              break
            case 'shift':
            case 'Shift':
            case 'SHIFT':
              shiftKey = true
              break
            case '':
              break
            default:
              pureKey = currentKeyPiece
          }
        })
      } else {
        pureKey = key
      }

      if (!pureKey) {
        return aggregator
      }

      if (typeof keyMap[key] === 'function') {
        if (onKeydown === triggerOnKeydown) {
          aggregator.push({
            altKey,
            ctrlKey,
            event: keyMap[key],
            key: pureKey,
            metaKey,
            onAllModifiers,
            onKeydown,
            shiftKey,
          })
        }
      } else {
        if (keyMap[key]?.onKeydown === triggerOnKeydown) {
          aggregator.push({
            ...keyMap[key],
            key: pureKey,
          })
        }
      }
      return aggregator
    },
    []
  )
}