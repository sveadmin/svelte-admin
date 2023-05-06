import {
  ValidatorStore,
} from '@sveadmin/common'

export interface TextInputEvents {
  blur: CustomEvent<Event>;
  change: CustomEvent<Event>;
  keyup: CustomEvent<KeyboardEvent>;
}

export interface TextInputProps {
  getValue?: {() : string};
  id?: string;
  setFocus?: boolean;
  validators?: ValidatorStore;
  value: string;
}

export const COMPONENT_TEXT_INPUT = 'text-input'