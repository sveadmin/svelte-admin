import {
  ValidatorStore,
} from '@sveadmin/common'

export const INPUT_TYPE_PASSWORD = 'password'

export const INPUT_TYPE_TEXT = 'text'

export const INPUT_TYPES = [
  INPUT_TYPE_PASSWORD,
  INPUT_TYPE_TEXT
]

export type InputTypes = typeof INPUT_TYPES[number]

export interface TextInputEvents {
  blur: CustomEvent<Event>;
  change: CustomEvent<Event>;
  keyup: CustomEvent<KeyboardEvent>;
}

export interface TextInputProps {
  getValue?: {() : string};
  id?: string;
  setFocus?: boolean;
  type?: InputTypes;
  validateWhileTyping?: boolean;
  validators?: ValidatorStore;
  value: string;
}

export const COMPONENT_TEXT_INPUT = 'text-input'