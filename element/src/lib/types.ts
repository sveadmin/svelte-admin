import type {
  Snippet,
} from 'svelte'

import type {
  TranslationStore,
  ValidatorStore,
} from '@sveadmin/common'

export interface Callback {
  callback: (event : Event) => void;
}

export interface CallbackOptional {
  callback?: (event : Event) => void;
}

export interface ChildrenClassListOptional {
  childrenClass?: string | string[];
}

export interface ChildrenStyleOptional {
  childrenStyle?: string | string[];
}

export interface ContainerStyleOptional {
  containerStyle?: string | string[];
}

export interface ClassListOptional {
  class?: string | string[];
}

export interface ContainerClassListOptional {
  containerClass?: string | string[];
}

export interface DataOptional {
  data?: {[key: string] : string};
}

export const DISPLAY_MODE_COMBO = 'combo';

export const DISPLAY_MODE_LABEL = 'label';

export const DISPLAY_MODE_VALUE = 'value';

export const ALLOWED_DISPLAY_MODES = [
  DISPLAY_MODE_COMBO,
  DISPLAY_MODE_LABEL,
  DISPLAY_MODE_VALUE,
]

export type AllowedDisplayMode = typeof ALLOWED_DISPLAY_MODES[number]

export interface CustomTranslationsOptional {
  i18n?: TranslationStore;
}

export interface DisplayModeOptional {
  displayMode?: AllowedDisplayMode;
}

export interface ElementInstanceOptional {
  instance?: HTMLInputElement;
}

export interface IconOptional {
  icon?: string;
  iconPrefix?: string;
}

export interface IdOptional {
  id?: string;
}

export interface IsDisabledOptional {
  isDisabled?: boolean;
}

export interface KeyMap {
  [key: string] : (event: Event) => boolean;
}

export interface LabelOptional {
  label?: string | Snippet;
  labelClass?: string | string[];
  labelStyle?: string | string[];
}

export interface NameOptional {
  name?: string;
}

export interface OnChangeOptional {
  onChange?: (event:Event) => void;
}

export interface OnClickOptional {
  onClick?: (event:Event) => void;
}

export type Option = {
  id: string;
  properties?: {[key: string] : string};
  value: string;
}

export type OptionIndexed = {
    index: number;
    label: string;
    properties?: {[key: string] : string};
    search: string;
}

export interface OptionData {
  options: Option[];
  optionsById: {[key: string] : OptionIndexed}
}

export interface OptionStore extends OptionData {
  add: (option: Option) => void;
  get options(): Option[];
  get optionsById(): {[key: string] : OptionIndexed};
  removeById: (id: string) => void;
  removeByValue: (value: string) => void;
  set options(options: Option[]);
}

export const SIZE_SMALL = 's'

export const SIZE_MEDIUM = 'm'

export const SIZE_LARGE = 'l'

export const SIZE_EXTRA_LARGE = 'xl'

export const ALLOWED_SIZES = [
  SIZE_SMALL,
  SIZE_MEDIUM,
  SIZE_LARGE,
  SIZE_EXTRA_LARGE,
]

export type AllowedSize = typeof ALLOWED_SIZES[number]

export interface SizeOptional {
  size?: AllowedSize;
}

export interface StyleOptional {
  style?: string | string[];
}

export interface TabIndexOptional {
  tabIndex?: number;
}

export interface ValidatorsOptional {
  getValidationData?: () => {};
  validators?: ValidatorStore;
}

export interface Value {
  value: any;
}

export interface ValueOptional {
  value?: any;
}


export interface ValuesOptional {
  values?: Option[] | OptionStore;
}