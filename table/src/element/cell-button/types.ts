import {
  RowAttributes,
  TableContextKey,
} from '../../types.js'

export interface CellButtonProps {
  callback?: (rowAttributes : RowAttributes) => void;
  contextKey: TableContextKey;
  icon?: string;
  label?: string;
  rowIndex: number;
}

export const COMPONENT_CELL_BUTTON = 'cell-button'