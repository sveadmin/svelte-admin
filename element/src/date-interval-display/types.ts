export interface DateIntervalDisplayProps {
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

export const COMPONENT_DATE_INTERVAL_DISPLAY = 'date-interval-display'