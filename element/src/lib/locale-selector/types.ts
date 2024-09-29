import {
  Locale,
} from '@sveadmin/common'

export interface LocaleSelectorEvents {
  valueChanged: CustomEvent<Locale | null>;
}

export interface LocaleSelectorProps {
  getLocales?: {() : Locale[]};
  locales?: Locale[];
  locale?: Locale;
  translations? : {[key: string] : string};
}

export const COMPONENT_LOCALE_SELECTOR = 'locale-selector'