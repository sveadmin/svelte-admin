import {
  IsValid,
  ValidatorStore,
} from '@sveadmin/common'

export type Option = {
  id: string;
  value: string;
}

import {
  AllowedDisplayMode,
} from '@sveadmin/element'

  import {
    CellComponent, TableContextKey,
  } from '../../types.js'

export interface CellDropdownSearchEvents {
  error: CustomEvent<{
    id: string;
    isValid: IsValid;
  }>;
  valueChanged: CustomEvent<string | null>;
  keyup: CustomEvent<KeyboardEvent>
}

export interface CellDropdownSearchProps {
  baseComponent: CellComponent,
  canHideHelpers?: boolean;
  clearValueOnInit?: boolean;
  column: string;
  contextKey: TableContextKey;
  displayMode?: AllowedDisplayMode;
  flipHelpers?: boolean;
  focused?: boolean;
  getValue?: {() : string | number};
  getValues?: {() : Array<Option>};
  id?: string;
  isEmptyAllowed?: boolean;
  isNewValueAllowed?: boolean;
  maxSuggestions?: number;
  rowIndex: number;
  setFocus?: boolean;
  showHelpers?: boolean;
  validators?: ValidatorStore;
  value?: string | number;
  values?: Array<Option>;
}

export const COMPONENT_CELL_DROPDOWN_SEARCH = 'cell-dropdown-search'