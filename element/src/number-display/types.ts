export interface NumberDisplayEvents {
  click: CustomEvent<null>;
  focus: CustomEvent<null>;
}

export interface NumberDisplayProps {
  decimals?: number;
  digits?: number;
  thousandSeparator?: number;
  value: string | number;
}