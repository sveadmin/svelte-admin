import type {
  Snippet,
} from 'svelte'

import type {
  AnyValidator,
  AnyValidatorFunction,
  TranslationStore,
  ValidatorStore,
} from '@sveadmin/common'

export const BUTTON_LEVEL_OUTLINE = 'outline'

export const BUTTON_LEVEL_PRIMARY = 'primary'

export const BUTTON_LEVEL_SECONDARY = 'secondary'

export const ALLOWED_BUTTON_LEVELS = [
  BUTTON_LEVEL_OUTLINE,
  BUTTON_LEVEL_PRIMARY,
  BUTTON_LEVEL_SECONDARY,
]

export type AllowedButtonLevel = typeof ALLOWED_BUTTON_LEVELS[number]

export interface AriaOptional {
  aria?: {[key: string] : string};
}

export type CallbackFunction = (...args: any[]) => any;

export interface ChildrenClassListOptional {
  childrenClass?: string | string[];
}

export interface ChildrenStyleOptional {
  childrenStyle?: string | string[];
}

export interface ClassListOptional {
  class?: string | string[];
}

export interface CommonInputProps extends
  AriaOptional,
  ClassListOptional,
  DataOptional,
  ElementInstanceOptional,
  IdOptional,
  IsAttachedOnLeftOptional,
  IsAttachedOnRightOptional,
  IsDisabledOptional,
  NameOptional,
  OnBlurOptional,
  OnMouseDownOptional,
  OnMouseUpOptional,
  OnChangeOptional,
  OnDragEnter,
  OnDragLeave,
  OnErrorOptional,
  OnFocusOptional,
  OnInitOptional,
  OnInputOptional,
  OnKeyDownOptional,
  OnKeyUpOptional,
  SizeOptional,
  StyleOptional,
  ValidatorsOptional,
  ValueOptional,
  VisibleHeightOptional,
  VisibleWidthOptional
{
  allowedKeys?: string[];
  allowedSeparators?: string[];
  autoFocus?: boolean;
  isValidationPerformedOnLoad?: boolean;
  isValidationPerformedWhileTyping?: boolean;
  maximumLength?: number;
  keyMap?: KeyMap;
  registerNestedValidator?: (validator: ValidatorStore, nestedValue?: AnyValidator | AnyValidatorFunction) => void;
}

export interface ContainerClassListOptional {
  containerClass?: string | string[];
}

export interface ContainerStyleOptional {
  containerStyle?: string | string[];
}

export interface CustomTranslationsOptional {
  i18n?: TranslationStore;
}

export interface DataOptional {
  data?: {[key: string] : string};
}

export type ElementInstance = {
  ref?: HTMLElement
};

export interface ElementInstanceOptional {
  instance?: ElementInstance
}

export interface Icon {
  icon: string | undefined;
  iconPrefix?: string | undefined;
}

export interface IconOptional {
  icon?: Icon;
  iconPrefix?: string;
}

export type IconProperty = undefined | string | Icon | Icon[];

// export interface Id {
//   id: string;
// }

export interface IdOptional {
  id?: string;
}

export interface IsAttachedOnLeftOptional {
  isAttachedOnLeft?: boolean;
}

export interface IsAttachedOnRightOptional {
  isAttachedOnRight?: boolean;
}

export interface IsDisabledOptional {
  isDisabled?: boolean;
}

export interface IsStaticOptional {
  isStatic?: boolean;
}

export interface KeyMap {
  [key: string] : (event: KeyboardEvent) => boolean | Promise<boolean>;
}

export interface LabelOptional {
  label?: string | Snippet;
  labelClass?: string | string[];
  labelStyle?: string | string[];
}

export interface NameOptional {
  name?: string;
}

export interface OnBlurOptional {
  onBlur?: (event?:Event | undefined, containerFunction?: ((event?:Event | undefined) => void)) => boolean;
}

export interface OnChangeOptional {
  onChange?: (event?: Event, containerFunction?: ((value: any) => void)) => boolean;
}

export interface OnClickOptional {
  onClick?: (event?: Event, containerFunction?: ((event: MouseEvent) => void)) => boolean;
}

export interface OnDragEnter {
  onDragEnter?: (event?: Event, containerFunction?: ((event: Event) => void)) => boolean;
}

export interface OnDragLeave {
  onDragLeave?: (event?: Event, containerFunction?: ((event: Event) => void)) => boolean;
}

export interface OnErrorOptional {
  onError?: (error?: Error, containerFunction?: ((error: Error) => void)) => boolean;
}

export interface OnFocusOptional {
  onFocus?: (event?: Event, containerFunction?: ((event: Event) => void)) => boolean;
}

export interface OnInitOptional {
  onInit?: (el?: HTMLElement, containerFunction?: ((el: HTMLElement) => void)) => void;
}

export interface OnInputOptional {
  onInput?: (event?: Event & { currentTarget: EventTarget & HTMLInputElement; }, containerFunction?: ((event: Event & { currentTarget: EventTarget & HTMLInputElement; }) => void)) => boolean;
}

export interface OnKeyDownOptional {
  onKeyDown?: (event?: KeyboardEvent, containerFunction?: ((event: KeyboardEvent) => void)) => boolean | Promise<boolean>;
}

export interface OnKeyUpOptional {
  onKeyUp?: (event?: KeyboardEvent, containerFunction?: ((event: KeyboardEvent) => void)) => boolean | Promise<boolean>;
}

export interface OnMouseDownOptional {
  onMouseDown?: (event?: MouseEvent, containerFunction?: ((event: MouseEvent) => void)) => boolean;
}

export interface OnMouseUpOptional {
  onMouseUp?: (event?: MouseEvent, containerFunction?: ((event: MouseEvent) => void)) => boolean;
}

export type Option = {
  label: string;
  properties?: {[key: string] : string | boolean};
  value: string | number;
}

export type OptionIndexed = Option & {
  index: number;
  get key(): string;
  search: string;
}

export interface OptionData {
  options: Option[];
  optionsMapped: Map<string, OptionIndexed>;
}

export interface OptionStore extends OptionData {
  add: (option?: Option) => void;
  generateSuggestions: (value?: string | number | null) => Array<string | null>;
  getDisplayValue: (key?: string | null) => string | null;
  getKey: (option: Option) => string;
  getKeyByValue: (value?: string | number | null) => string | undefined;
  getOption: (key?: string) => OptionIndexed | undefined;
  getValue: (key?: string) => string | number | null;
  get options(): Option[];
  get optionsMapped(): Map<string, OptionIndexed>;
  removeByKey: (key: string) => void;
  removeByLabel: (label: string) => void;
  removeByValue: (value: string) => void;
  setGetDisplayValue: (getDisplayValue: (key?: string | null) => string | null) => void;
  setIsEmptyAllowed: (isEmptyAllowed: boolean) => void;
  setSuggestionsLength: (suggestionsLength: number) => void;
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
] as const

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

export const VISIBLE_SIZE_UNIT_CHARACTERS = 'ch';

export const VISIBLE_SIZE_UNIT_ELEMENT = 'em';

export const VISIBLE_SIZE_UNIT_PICAS = 'pc';

export const VISIBLE_SIZE_UNIT_PIXEL = 'px';

export const VISIBLE_SIZE_UNIT_POINTS = 'pt';

export const VISIBLE_SIZE_UNIT_ROOT_ELEMENT = 'rem';

export const VISIBLE_SIZE_UNIT_SPAN = 'span';

export const VISIBLE_SIZE_UNIT_VIEWPORT_HEIGHT = 'vh';

export const VISIBLE_SIZE_UNIT_VIEWPORT_WIDTH = 'vw';

export const ALLOWED_VISIBLE_SIZE_UNITS = [
  VISIBLE_SIZE_UNIT_ELEMENT,
  VISIBLE_SIZE_UNIT_PICAS,
  VISIBLE_SIZE_UNIT_PIXEL,
  VISIBLE_SIZE_UNIT_POINTS,
  VISIBLE_SIZE_UNIT_ROOT_ELEMENT,
  VISIBLE_SIZE_UNIT_VIEWPORT_HEIGHT,
  VISIBLE_SIZE_UNIT_VIEWPORT_WIDTH,
] as const

export type VisibleSizeUnits = typeof ALLOWED_VISIBLE_SIZE_UNITS[number]

export interface VisibleSizeObject {
  unit?: VisibleSizeUnits;
  size: number;
}

export type VisibleSize = VisibleSizeObject | string;

export interface VisibleHeightOptional {
  visibleHeight?: VisibleSize;
}

export interface VisibleWidthOptional {
  visibleWidth?: VisibleSize;
}