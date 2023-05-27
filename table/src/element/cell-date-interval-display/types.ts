export interface CellDateIntervalDisplayProps {
  displayInterval: boolean;
  format: string;
  isHighlighted: ((currentDiff: number) => boolean);
  prefix: string;
  postfix: string;
  secondsDenominator: number;
  updateInterval: number;
  value: string | Date;
}

export const COMPONENT_CELL_DATE_INTERVAL = 'cell-date-interval'