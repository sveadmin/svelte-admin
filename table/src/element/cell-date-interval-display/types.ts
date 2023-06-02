export interface CellDateIntervalDisplayProps {
  displayInterval?: boolean;
  format?: string;
  isHighlighted?: ((currentDiff: number) => boolean);
  onClick?: (event: CustomEvent<EventTarget>) => void;
  prefix?: ((diff: number) => string);
  postfix?: ((diff: number) => string);
  refreshAt?: number;
  secondsDenominator?: number;
  value: string | Date;
}