import type {
  Snippet,
} from 'svelte'

import type {
  AnyValidator,
  AnyValidatorFunction,
  IsValid,
  TranslationStore,
  ValidatorStore,
} from '@sveadmin/common'

export interface ChildrenClassListOptional {
  childrenClass?: string | string[];
}

export interface ChildrenDefinition {
  [key: number] : {[key: string] : any} | undefined;
}

export interface ChildrenStyleOptional {
  childrenStyle?: string | string[];
}

export interface ClassListOptional {
  class?: string | string[];
}

export interface CommonInputProps extends
  ClassListOptional,
  DataOptional,
  ElementInstanceOptional,
  IdOptional,
  IsAttachedOnLeftOptional,
  IsAttachedOnRightOptional,
  IsDisabledOptional,
  NameOptional,
  OnBlurOptional,
  OnChangeOptional,
  OnDragEnter,
  OnDragLeave,
  OnErrorOptional,
  OnFocusOptional,
  OnInitOptional,
  OnInputOptional,
  OnKeyDownOptional,
  OnKeyUpOptional,
  StyleOptional,
  ValidatorsOptional,
  ValueOptional
{
  allowedKeys?: string[];
  allowedSeparators?: string[];
  autoFocus?: boolean;
  maximumLength?: number;
  keyMap?: KeyMap;
  registerNestedValidator?: (validator: ValidatorStore, nestedValue?: AnyValidator | AnyValidatorFunction) => void;
  type?: InputTypes;
  validateWhenLoaded?: boolean;
  validateWhileTyping?: boolean;
  visibleWidth?: VisibleSize;
}

export interface ContainerClassListOptional {
  containerClass?: string | string[];
}

export interface ContainerStyleOptional {
  containerStyle?: string | string[];
}

export const CONTROL_INPUT_TYPE_BUTTON = 'button'

export const CONTROL_INPUT_TYPE_RESET = 'reset'

export const CONTROL_INPUT_TYPE_SUBMIT = 'submit'

export const CONTROL_INPUT_TYPES = [
  CONTROL_INPUT_TYPE_BUTTON,
  CONTROL_INPUT_TYPE_RESET,
  CONTROL_INPUT_TYPE_SUBMIT,
] as const

export type ControlInputTypes = typeof CONTROL_INPUT_TYPES[number]

export interface DataOptional {
  data?: {[key: string] : string};
}

export const DATE_INPUT_TYPE_DATE = 'date'

export const DATE_INPUT_TYPE_DATE_TIME = 'dateTime'

export const DATE_INPUT_TYPE_DAY = 'day'

export const DATE_INPUT_TYPE_ERA = 'era'

export const DATE_INPUT_TYPE_INTERVAL = 'interval'

export const DATE_INPUT_TYPE_MONTH = 'month'

export const DATE_INPUT_TYPE_TIME = 'time'

export const DATE_INPUT_TYPE_YEAR = 'year'

export const DATE_INPUT_TYPES = [
  DATE_INPUT_TYPE_DATE,
  DATE_INPUT_TYPE_DATE_TIME,
  DATE_INPUT_TYPE_DAY,
  DATE_INPUT_TYPE_ERA,
  DATE_INPUT_TYPE_INTERVAL,
  DATE_INPUT_TYPE_MONTH,
  DATE_INPUT_TYPE_TIME,
  DATE_INPUT_TYPE_YEAR,
] as const

export type DateInputTypes = typeof DATE_INPUT_TYPES[number]

export const DISPLAY_MODE_COMBO = 'combo';

export const DISPLAY_MODE_LABEL = 'label';

export const DISPLAY_MODE_VALUE = 'value';

export const ALLOWED_DISPLAY_MODES = [
  DISPLAY_MODE_COMBO,
  DISPLAY_MODE_LABEL,
  DISPLAY_MODE_VALUE,
] as const

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

export interface Icon {
  icon: string;
  iconPrefix?: string;
}

export interface IconOptional {
  icon?: Icon;
  iconPrefix?: string;
}

export type IconProperty = undefined | string | Icon | Icon[];

export interface Id {
  id: string;
}

export interface IdOptional {
  id?: string;
}

export type InputTypes = ControlInputTypes
  | DateInputTypes
  | NumberInputType
  | TextInputTypes
  | TimeInputTypes

export interface IsAttachedOnLeftOptional {
  isAttachedOnLeft?: boolean;
}

export interface IsAttachedOnRightOptional {
  isAttachedOnRight?: boolean;
}

export interface IsDisabledOptional {
  isDisabled?: boolean;
}

export interface KeyMap {
  [key: string] : (event: KeyboardEvent) => boolean | Promise<boolean>;
}

export const KEY_DOWN_ALLOWED_KEYS = '_ALLOWED_KEYS'

export const KEY_ALLOWED_KEYS = 'ALLOWED_KEYS'

export const KEY_DOWN_UNMATCHED = '_UNMATCHED'

export const KEY_UNMATCHED = 'UNMATCHED'

export interface LabelOptional {
  label?: string | Snippet;
  labelClass?: string | string[];
  labelStyle?: string | string[];
}

export interface NameOptional {
  name?: string;
}

export const NUMBER_INPUT_TYPE = 'number'

export type NumberInputType = typeof NUMBER_INPUT_TYPE

export interface OnBlurOptional {
  onBlur?: (event?:Event | undefined, containerFunction?: ((event?:Event | undefined) => void)) => boolean;
}

export interface OnChangeOptional {
  onChange?: (value: any, containerFunction?: ((value: any) => void)) => boolean;
}

export interface OnClickOptional {
  onClick?: (event: Event, containerFunction?: ((event: Event) => void)) => boolean;
}

export interface OnDragEnter {
  onDragEnter?: (event: Event, containerFunction?: ((event: Event) => void)) => boolean;
}

export interface OnDragLeave {
  onDragLeave?: (event: Event, containerFunction?: ((event: Event) => void)) => boolean;
}

export interface OnErrorOptional {
  onError?: (error: Error, containerFunction?: ((error: Error) => void)) => boolean;
}

export interface OnFocusOptional {
  onFocus?: (event?: Event, containerFunction?: ((event: Event) => void)) => boolean;
}

export interface OnInitOptional {
  onInit?: (el: HTMLElement, containerFunction?: ((el: HTMLElement) => void)) => void;
}

export interface OnInputOptional {
  onInput?: (event: Event & { currentTarget: EventTarget & HTMLInputElement; }, containerFunction?: ((event: Event & { currentTarget: EventTarget & HTMLInputElement; }) => void)) => boolean;
}

export interface OnKeyDownOptional {
  onKeyDown?: (event: KeyboardEvent, containerFunction?: ((event: KeyboardEvent) => void)) => boolean | Promise<boolean>;
}

export interface OnKeyUpOptional {
  onKeyUp?: (event: KeyboardEvent, containerFunction?: ((event: KeyboardEvent) => void)) => boolean | Promise<boolean>;
}

export interface OnMouseDownOptional {
  onMouseDown?: (event: MouseEvent, containerFunction?: ((event: MouseEvent) => void)) => boolean;
}

export interface OnMouseUpOptional {
  onMouseUp?: (event: MouseEvent, containerFunction?: ((event: MouseEvent) => void)) => boolean;
}

export type Option = {
  label: string;
  properties?: {[key: string] : string | boolean};
  value: string;
}

export type OptionIndexed = {
    index: number;
    label: string;
    properties?: {[key: string] : string | boolean};
    search: string;
}

export interface OptionData {
  options: Option[];
  optionsByValue: Map<string, OptionIndexed>
}

export interface OptionStore extends OptionData {
  add: (option: Option) => void;
  get options(): Option[];
  get optionsByValue(): Map<string, OptionIndexed>;
  removeByLabel: (label: string) => void;
  removeByValue: (value: string) => void;
  set options(options: Option[]);
}

export interface PaddingOverwriteOptional {
  paddingOverwriteLeft?: VisibleSize;
  paddingOverwriteRight?: VisibleSize;
}

export interface ParsedKeyMap {
  altKey?: boolean;
  ctrlKey?: boolean;
  event: (event: KeyboardEvent) => boolean | Promise<boolean>;
  key?: string;
  metaKey?: boolean;
  onAllModifiers?: boolean;
  onKeydown?: boolean;
  regex?: RegExp;
  shiftKey?: boolean;
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

export const SIZE_DIRECTION_HORIZONTAL = 'horizontal'

export const SIZE_DIRECTION_VERTICAL = 'vertical'

export const ALLOWED_SIZE_DIRECTIONS = [
  SIZE_DIRECTION_HORIZONTAL,
  SIZE_DIRECTION_VERTICAL,
] as const

export type AllowedSizeDirection = typeof ALLOWED_SIZE_DIRECTIONS[number]

export interface StyleOptional {
  style?: string | string[];
}

export interface TabIndexOptional {
  tabIndex?: number;
}

export const TEXT_INPUT_TYPE_NUMBER = 'number'

export const TEXT_INPUT_TYPE_PASSWORD = 'password'

export const TEXT_INPUT_TYPE_TEL = 'tel'

export const TEXT_INPUT_TYPE_TEXT = 'text'

export const TEXT_INPUT_TYPES = [
  TEXT_INPUT_TYPE_NUMBER,
  TEXT_INPUT_TYPE_PASSWORD,
  TEXT_INPUT_TYPE_TEL,
  TEXT_INPUT_TYPE_TEXT,
]

export type TextInputTypes = typeof TEXT_INPUT_TYPES[number]

export const TIME_INPUT_TYPE_DAY_PERIOD = 'dayPeriod'

export const TIME_INPUT_TYPE_FRACTIONAL_SECOND = 'fractionalSecond'

export const TIME_INPUT_TYPE_HOUR = 'hour'

export const TIME_INPUT_TYPE_MINUTE = 'minute'

export const TIME_INPUT_TYPE_SECOND = 'second'

export const TIME_INPUT_TYPE_TIME_ZONE = 'timeZoneName'

export const TIME_INPUT_TYPES = [
  TIME_INPUT_TYPE_DAY_PERIOD,
  TIME_INPUT_TYPE_FRACTIONAL_SECOND,
  TIME_INPUT_TYPE_HOUR,
  TIME_INPUT_TYPE_MINUTE,
  TIME_INPUT_TYPE_SECOND,
  TIME_INPUT_TYPE_TIME_ZONE,
] as const

export type TimeInputTypes = typeof TIME_INPUT_TYPES[number]

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

export interface ValueHelperStore {
  current?: string | number | string[] | number[] | null, // What the user last typed in
  inputFocused?: boolean,
  display?: string | string[] | null, // The value bound to the input element
  original?: string | number | null, // Value from the last update
  suggestionSelectionInProgress?: boolean,
  value: string | number | null, // Last selected value
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