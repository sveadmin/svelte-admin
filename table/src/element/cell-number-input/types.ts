import {
  ValidatorStore,
} from '@sveadmin/common'

import {
  CellComponent,
  TableContextKey,
} from '../../types.js'

export interface CellNumberInputProps {
  baseComponent: CellComponent;
  column: string;
  contextKey: TableContextKey;
  decimals?: number;
  digits?: number;
  getValue?: {() : string | number};
  id?: string;
  rowIndex: number;
  thousandSeparator?: number;
  validators?: ValidatorStore;
  value: string | number;
}

export const COMPONENT_CELL_NUMBER_INPUT = 'cell-number-input'