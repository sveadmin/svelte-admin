import type {
  AllowedSize
} from '$lib/types.js'

import type {
  ButtonInputProps,
} from '$lib/button/index.js'

export function copyButton(onClick: () => boolean, size?: AllowedSize) : ButtonInputProps {
  return {
    leftIcon: 'copy',
    onClick,
    size,
    type: 'button',
  }
}