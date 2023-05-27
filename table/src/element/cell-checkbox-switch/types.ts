import {
  TableContextKey,
} from '../../types.js'

export interface CellCheckboxSwitchProps {
  contextKey: TableContextKey;
  disabled?: boolean;
  falseLabel?: string;
  getValue?: {() : boolean};
  name?: string;
  rowIndex: number;
  trueLabel?: string;
  uniqueKey?: string;
  value: boolean;
}

export interface CellCheckboxSwitchEvents {
  click: EventTarget | null;
  valueChanged: CustomEvent<boolean>;
}

export const COMPONENT_CELL_CHECKBOX_SWITCH = 'cell-checkbox-switch'