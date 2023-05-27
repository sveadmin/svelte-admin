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

export const COMPONENT_CELL_INTERVAL_DISPLAY = 'cell-interval-display'