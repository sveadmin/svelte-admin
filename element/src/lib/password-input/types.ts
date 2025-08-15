
import type {
  TextInputProps,
} from '$lib/text-input/index.js'

export const COMPONENT_PASSWORD_INPUT = 'password-input'

export interface PasswordInputProps extends TextInputProps {
  isLowercaseRequired?: boolean;
  isPasswordHelperVisible?: boolean;
  isNumberRequired?: boolean;
  isRevealed?: boolean;
  isSpecialCharacterRequired?: boolean;
  isUppercaseRequired?: boolean;
  maximumLength?: number;
  minimumLength?: number;
}
