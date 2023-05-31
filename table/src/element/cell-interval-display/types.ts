export interface CellIntervalDisplayProps {
  isHighlighted: boolean;
  prefix: string;
  postfix: string;
  secondsDenominator: number;
  value: number;
}

export interface CellIntervalDisplayEvents {
    click: CustomEvent<EventTarget>;
}