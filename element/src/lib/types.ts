import type {
  Snippet,
} from 'svelte'

import type {
  IsValid,
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

export interface CommonInputProps extends
  ClassListOptional,
  ElementInstanceOptional,
  IdOptional,
  IsDisabledOptional,
  NameOptional,
  StyleOptional,
  ValidatorsOptional,
  ValueOptional
{
  autoFocus?: boolean;
  keyMap?: KeyMap;
  onBlur?: (event: Event) => void;
  onChange?: (value: any) => void;
  onError?: (error: Error) => void;
  onFocus?: (event?: Event) => void;
  onInit?: (el: HTMLElement) => void;
  onKeyup?: (event: KeyboardEvent) => void;
  validateWhenLoaded?: boolean;
  validateWhileTyping?: boolean;
  visibleWidth?: VisibleWidth;
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

export interface Id {
  id: string;
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
  onClick?: (event: MouseEvent) => void;
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

export const VISIBLE_WIDTH_UNIT_CHARACTERS = 'ch';

export const VISIBLE_WIDTH_UNIT_ELEMENT = 'em';

export const VISIBLE_WIDTH_UNIT_PICAS = 'pc';

export const VISIBLE_WIDTH_UNIT_PIXEL = 'px';

export const VISIBLE_WIDTH_UNIT_POINTS = 'pt';

export const VISIBLE_WIDTH_UNIT_ROOT_ELEMENT = 'rem';

export const VISIBLE_WIDTH_UNIT_SPAN = 'span';

export const VISIBLE_WIDTH_UNIT_VIEWPORT_HEIGHT = 'vh';

export const VISIBLE_WIDTH_UNIT_VIEWPORT_WIDTH = 'vw';

export const ALLOWED_VISITBLE_WIDTH_UNITS = [
  VISIBLE_WIDTH_UNIT_ELEMENT,
  VISIBLE_WIDTH_UNIT_PICAS,
  VISIBLE_WIDTH_UNIT_PIXEL,
  VISIBLE_WIDTH_UNIT_POINTS,
  VISIBLE_WIDTH_UNIT_ROOT_ELEMENT,
  VISIBLE_WIDTH_UNIT_VIEWPORT_HEIGHT,
  VISIBLE_WIDTH_UNIT_VIEWPORT_WIDTH,
]

export type VisibleWidthUnits = typeof ALLOWED_VISITBLE_WIDTH_UNITS[number]

export interface VisibleWidthObject {
  unit?: VisibleWidthUnits;
  width: number;
}

export type VisibleWidth = VisibleWidthObject | string;
