import {
  ValidatorStore,
} from '@sveadmin/common'

export const COMPONENT_PASSWORD_INPUT = 'password-input'

export interface PasswordInputEvents {
  blur: CustomEvent<Event>;
  change: CustomEvent<Event>;
  keyup: CustomEvent<KeyboardEvent>;
}

export interface PasswordInputProps {
  getValue?: {() : string};
  id?: string;
  setFocus?: boolean;
  validators?: ValidatorStore;
  value: string;
}