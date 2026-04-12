/**
 * Naming conventions for the various element property interfaces
 * > ComponentXX -> defines a component, which includes a type
 *     a display property which contains the configuration for the component
 *       in general this configuration is used when rendering something as part of a compund display
 *     an input property which can be any SveadminComponent with type and display properties
 *     if input property is undefined, in put mode display will fallback to the display mode property
 *       (useful for data which can not be edited)
 *       This property is used when rendering a component as part of an Cluster
 * > XXDisplayProps -> properties for a display only component
 * > XXDisplayWrappedProps -> The same component as without the Wrapped part
 *      offers a container around the specific component with some convenience functions
 * > XXInputProps -> properties for an input only component
 * > XXInputWrappedProps -> The same component as without the Wrapped part
 */
export * from './component-common-properties.js'

import type {
  OptionIndexed,
} from './component-common-properties.js'

export interface ChildrenDefinition {
  [key: PropertyKey] : {[key: string] : any} | undefined;
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

export type InputTypes = ControlInputTypes
  | DateInputTypes
  | NumberInputType
  | TextInputTypes
  | TimeInputTypes

export interface IsAttachedOnLeftOptional {
  isAttachedOnLeft?: boolean;
}

export const KEY_DOWN_ALLOWED_KEYS = '^ALLOWED_KEYS'

export const KEY_ALLOWED_KEYS = 'ALLOWED_KEYS'

export const KEY_DOWN_UNMATCHED = '^UNMATCHED'

export const KEY_UNMATCHED = 'UNMATCHED'

export const NUMBER_INPUT_TYPE = 'number'

export type NumberInputType = typeof NUMBER_INPUT_TYPE

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

export const SIZE_DIRECTION_HORIZONTAL = 'horizontal'

export const SIZE_DIRECTION_VERTICAL = 'vertical'

export const ALLOWED_SIZE_DIRECTIONS = [
  SIZE_DIRECTION_HORIZONTAL,
  SIZE_DIRECTION_VERTICAL,
] as const

export type AllowedSizeDirection = typeof ALLOWED_SIZE_DIRECTIONS[number]

export const COMPONENT = 'component'

export interface SveadminElement<T extends SveadminElementConfig | undefined> {
  config?: T;
  type?: any;
}

export interface SveadminComponent<
  T,
  U extends SveadminElementConfig | undefined = SveadminElementConfig | undefined,
  V extends SveadminElementConfig | undefined = SveadminElementConfig | undefined
> {
  display?: SveadminElement<U>; 
  index?: number; // Used when part of a compound component, eg.: TextDisplay, Cluster
  input?: SveadminElement<V>;
  isInputVisible?: boolean;
  isVisible?: boolean;
  name?: string;
  type: T;
}

export type SveadminComponentMask = Array<SveadminComponent<any> | string> | string

export interface SveadminElementConfig { // Add list of possible component configs
  [key: PropertyKey] : any;
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

export interface ValueHelperStore {
  current?: string | number | string[] | number[] | null; // What the user last typed in
  inputFocused?: boolean;
  display?: string | string[] | null; // The value bound to the input element
  key?: string;
  option?: OptionIndexed;
  original?: string | null; // Key from the last update
  suggestionSelectionInProgress?: boolean;
  value: string | number | null; // Last selected value
}