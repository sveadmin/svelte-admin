import {
  Writable,
} from 'svelte/store'

import {
  ValidatorStore,
} from '@sveadmin/common'

export const hoursOuterRing = ['12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']

export const hoursInnerRing = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']

export const minutesOuterRing = ['00', null, null, '15', null, null, '30', null, null, '45', null, null]

export const minutesInnerRing = [null, '05', '10', null, '20', '25', null, '35', '40', null, '50', '55']

export const DATE_SELECTOR__VIEW_DAY_GRID = 'daygrid'

export const DATE_SELECTOR__VIEW_HOURS = 'hourselector'

export const DATE_SELECTOR__VIEW_MINUTES = 'minuteselector'

export const DATE_SELECTOR__ALLOWED_VIEWS = [
  DATE_SELECTOR__VIEW_DAY_GRID,
  DATE_SELECTOR__VIEW_HOURS,
  DATE_SELECTOR__VIEW_MINUTES,
]

export const DATE_PART__DAY = 'day'

export const DATE_PART__HOUR = 'hour'

export const DATE_PART__MINUTE = 'minute'

export const DATE_PART__MONTH = 'month'

export const DATE_PART__SECOND = 'second'

export const DATE_PART__YEAR = 'year'

export const DATE_PART__ALLOWED = [
  DATE_PART__DAY,
  DATE_PART__HOUR,
  DATE_PART__MINUTE,
  DATE_PART__MONTH,
  DATE_PART__SECOND,
  DATE_PART__YEAR,
]

export const TYPE_IN__YEAR_FULL = 'yyyy'

export const TYPE_IN__YEAR_SHORT = 'yy'

export const TYPE_IN__MONTH_FULL = 'mmmm'

export const TYPE_IN__MONTH_SHORT = 'mm'

export const TYPE_IN__DAY = 'dd'

export const TYPE_IN__HOUR_12 = 'hh'

export const TYPE_IN__HOUR_24 = 'HH'

export const TYPE_IN__MINUTE = 'MM'

export const TYPE_IN__SECOND = 'ss'

export const TYPE_IN__ALLOWED = [
  TYPE_IN__YEAR_FULL,
  TYPE_IN__YEAR_SHORT,
  TYPE_IN__MONTH_FULL,
  TYPE_IN__MONTH_SHORT,
  TYPE_IN__DAY,
  TYPE_IN__HOUR_12,
  TYPE_IN__HOUR_24,
  TYPE_IN__MINUTE,
  TYPE_IN__SECOND,
]

export const TYPE_IN__TIME_FIELDS = [
  TYPE_IN__HOUR_12,
  TYPE_IN__HOUR_24,
  TYPE_IN__MINUTE,
  TYPE_IN__SECOND,
]

export type DateSelectorView = typeof DATE_SELECTOR__ALLOWED_VIEWS[number]

export type DatePart = typeof DATE_PART__ALLOWED[number]

export type TypeIn = typeof TYPE_IN__ALLOWED[number]

export interface DateSelectorDisplayStoreConstructor {
  format?: string;
  selected?: Date;
  selectedView: string;
  validators: ValidatorStore;
  value: Date | string | null;
}

export interface DateSelectorDisplayData {
  displaySelected?: string;
  displaySelectedUTC?: string;
  displayDay?: string;
  displayHour?: string;
  displayMinute?: string;
  displayMonth?: string;
  displaySecond?: string;
  displayYear?: string;
  displayValue?: Date;
  isSelectorVisible: boolean
  selected?: Date;
  selectedHour?: number;
  selectedMinute?: number;
  selectedMonth?: number;
  selectedYear?: number;
  selectedView: DateSelectorView;
}

export interface DateSelectorDisplayStore extends Writable<DateSelectorDisplayData> {
  getByDatePart: (part: DatePart) => string;
  getSelectedDate: () => Date | null;
  setDisplayValue: (date: Date) => void;
  setIsSelectorVisible: (isSelectorVisible: boolean) => void;
  setSelectedView: (view: DateSelectorView) => void;
  setSelectedDate: (date: Date | null) => void;
  setSelectedDatePart: (part: DatePart, newValue: number) => void;
}

export interface DateFieldProps {
  max?: number;
  maxLength?: number;
  min?: number;
  onBlur?: (event: Event) => void;
  onFocus?: (event: Event) => void;
  type?: TypeIn;
  value?: string;
}

export interface DateSelectorTabsProps {
  displayStore: DateSelectorDisplayStore;
}

export interface DayGridProps {
  displayStore: DateSelectorDisplayStore;
  isTimeChangeable: boolean;
  validators: ValidatorStore;
  weekStartsOn: number;
}

export interface DayGridEvents {
    selectionFinished: null;
}

export interface HourSelectorProps {
  displayStore: DateSelectorDisplayStore;
}

export interface MinuteSelectorProps {
  displayStore: DateSelectorDisplayStore;
}

export interface MinuteSelectorEvents {
    selectionFinished: null;
}

export interface DateSelectorProps {
  format?: string;
  isInvalidDateAllowed?: boolean;
  isTimeChangeable?: boolean;
  selected?: Date;
  selectedView?: DateSelectorView;
  typeInFields: Array<TypeIn | string>;
  validators?: ValidatorStore;
  value?: Date | string | null;
  weekStartsOn?: number;
}
