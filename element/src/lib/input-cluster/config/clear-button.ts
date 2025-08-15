import type {
  AllowedSize
} from '$lib/types.js'

import type {
  ButtonInputProps,
} from '$lib/button/index.js'

export function clearButton(onClick: () => void, size?: AllowedSize) : ButtonInputProps {
  return {
    leftIcon: 'erase',
    onClick,
    size,
    type: 'button',
  }
}