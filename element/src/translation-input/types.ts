import {
  ALLOWED_LOCALES,
  MultiLanguageText,
} from '@sveadmin/common'

export interface TranslationInputEvents {
  blur: CustomEvent<Event>;
  change: CustomEvent<Event>;
  keyup: CustomEvent<KeyboardEvent>;
}

export interface TranslationInputProps {
  getValue?: {() : MultiLanguageText};
  id?: string;
  locale: typeof ALLOWED_LOCALES[number];
  setFocus?: boolean;
  value: MultiLanguageText;
}

export const COMPONENT_TRANSLATION_INPUT = 'translation-input'