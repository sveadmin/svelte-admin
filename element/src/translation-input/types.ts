import {
  ALLOWED_LOCALES,
  ValidatorStore,
} from '@sveadmin/common'

export interface TranslationInputEvents {
  blur: CustomEvent<Event>;
  change: CustomEvent<Event>;
  keyup: CustomEvent<KeyboardEvent>;
}

export interface TranslationInputProps {
  id?: string;
  locale: typeof ALLOWED_LOCALES[number];
  setFocus?: boolean;
  value: string;
}