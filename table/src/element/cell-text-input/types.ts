import {
  ValidatorStore,
} from '@sveadmin/common'

import {
  CellComponent,
  TableContextKey,
} from '../../types.js'

export interface CellTextInputProps {
  baseComponent: CellComponent;
  column: string;
  contextKey: TableContextKey;
  getValue?: {() : string};
  id?: string;
  rowIndex: number;
  validators?: ValidatorStore;
  value: string;
}

export const COMPONENT_CELL_TEXT_INPUT = 'cell-text-input'