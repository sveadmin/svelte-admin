export interface CellNumberDisplayProps {
  decimals?: number;
  digits?: number;
  thousandSeparator?: number;
  value: string | number;
}

export const COMPONENT_CELL_NUMBER_DISPLAY = 'cell-number-display'