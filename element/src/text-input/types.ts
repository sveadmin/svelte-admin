import {
  ValidatorStore,
} from '@sveadmin/common'

export interface TextInputEvents {
  blur: CustomEvent<Event>;
  change: CustomEvent<Event>;
  keyup: CustomEvent<KeyboardEvent>;
}

export interface TextInputProps {
  id?: string;
  setFocus?: boolean;
  validators?: ValidatorStore;
  value: string;
}