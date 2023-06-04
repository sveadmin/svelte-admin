export interface DateIntervalDisplayProps {
  displayMode: AllowedIntervalDisplayMode;
  format: string;
  isHighlighted: ((currentDiff: number) => boolean);
  prefix: ((diff: number) => string);
  postfix: ((diff: number) => string);
  refreshAt: number;
  secondsDenominator: number;
  showInterval: boolean;
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