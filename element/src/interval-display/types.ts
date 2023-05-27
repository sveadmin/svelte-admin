export interface IntervalDisplayProps {
  isHighlighted: boolean;
  prefix: string;
  postfix: string;
  secondsDenominator: number;
  value: number;
}

export interface IntervalDisplayEvents {
    click: CustomEvent<EventTarget>;
}

export const COMPONENT_INTERVAL_DISPLAY = 'interval-display'