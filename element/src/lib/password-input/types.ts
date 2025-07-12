
import type {
  TextInputProps,
} from '$lib/text-input/index.js'

export const COMPONENT_PASSWORD_INPUT = 'password-input'

export interface PasswordInputProps extends TextInputProps{
  isRevealed ?: boolean;
}
