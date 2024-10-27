import type {
  ClassListOptional,
  DisplayModeOptional,
  IdOptional,
  IsDisabledOptional,
  KeyMap,
  StyleOptional,
  ValidatorsOptional,
  ValueOptional,
  ValuesOptional,
} from '$lib/types.js'


export const COMPONENT_TEXT_INPUT = 'text-input'

export const INPUT_TYPE_NUMBER = 'number'

export const INPUT_TYPE_PASSWORD = 'password'

export const INPUT_TYPE_TEXT = 'text'

export const INPUT_TYPES = [
  INPUT_TYPE_NUMBER,
  INPUT_TYPE_PASSWORD,
  INPUT_TYPE_TEXT
]

export type InputTypes = typeof INPUT_TYPES[number]

export interface TextInputProps extends
  ClassListOptional,
  DisplayModeOptional,
  IdOptional,
  IsDisabledOptional,
  StyleOptional,
  ValidatorsOptional,
  ValueOptional,
  ValuesOptional
{
  areErrorsVisible?: boolean;
  focused?: boolean;
  isEmptyAllowed?: boolean;
  keyMap?: KeyMap; 
  onBlur?: (event: Event) => void;
  onChange?: (value: any) => void;
  onError?: (error: Error) => void;
  onFocus?: (event: Event) => void;
  onKeyup?: (event: KeyboardEvent) => void;
  setFocus?: boolean;
  type?: InputTypes;
  validateWhileTyping?: boolean;
}