export interface DateIntervalPieces {
  days: (isExactValueNeeded?: boolean) => number;
  daysRemainder: (isExactValueNeeded?: boolean) => number;
  hours: (isExactValueNeeded?: boolean) => number;
  hoursRemainder: (isExactValueNeeded?: boolean) => number;
  minutes: (isExactValueNeeded?: boolean) => number;
  minutesRemainder: (isExactValueNeeded?: boolean) => number;
  seconds: (isExactValueNeeded?: boolean) => number;
  secondsRemainder: (isExactValueNeeded?: boolean) => number;
  weeks: (isExactValueNeeded?: boolean) => number;
  months: (isExactValueNeeded?: boolean) => number;
  monthsRemainder: (isExactValueNeeded?: boolean) => number;
  years: (isExactValueNeeded?: boolean) => number;
}

export interface DateIntervalPiecesData {
  days?: number;
  daysRemainder?: number;
  hours?: number;
  hoursRemainder?: number;
  minutes?: number;
  minutesRemainder?: number;
  seconds?: number;
  secondsRemainder?: number;
  weeks?: number;
  months?: number;
  monthsRemainder?: number;
  years?: number;
}

export interface DateIntervalDictionaryConstructor {
  prefix: ((isPastDate: boolean) => string);
  postfix: ((isPastDate: boolean) => string);
}

export interface DateIntervalDictionary {
  (intervalPieces: DateIntervalPieces, isPastDate: boolean) : string
}

export interface DateIntervalDisplayProps {
  displayMode: AllowedIntervalDisplayMode;
  format: string;
  isHighlighted: ((currentDiff: number) => boolean);
  prefix: ((diff: number) => string);
  postfix: ((diff: number) => string);
  refreshAt: number;
  secondsDenominator: number;
  value: null | Date | string;
}

export interface DateIntervalDisplayEvents {
    click: CustomEvent<EventTarget>;
}

export const DISPLAY_INTERVAL_DATE = 'date'

export const DISPLAY_INTERVAL_INTERVAL = 'interval'

export const ALLOWED_INTERVAL_DISPLAY_MODES = [
  DISPLAY_INTERVAL_DATE,
  DISPLAY_INTERVAL_INTERVAL,
]

export type AllowedIntervalDisplayMode = typeof ALLOWED_INTERVAL_DISPLAY_MODES[number]

export const COMPONENT_DATE_INTERVAL_DISPLAY = 'date-interval-display'