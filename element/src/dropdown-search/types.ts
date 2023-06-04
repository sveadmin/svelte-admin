import {
  IsValid,
  ValidatorStore,
} from '@sveadmin/common'

export type Option = {
  id: string;
  value: string;
}

export const DISPLAY_DROPDOWN_COMBO = 'combo';

export const DISPLAY_DROPDOWN_LABEL = 'label';

export const DISPLAY_DROPDOWN_VALUE = 'value';

export const ALLOWED_DROPDOWN_DISPLAY_MODES = [
  DISPLAY_DROPDOWN_COMBO,
  DISPLAY_DROPDOWN_LABEL,
  DISPLAY_DROPDOWN_VALUE
]

export type AllowedDropdownDisplayMode = typeof ALLOWED_DROPDOWN_DISPLAY_MODES[number]

export interface DropdownSearchEvents {
  error: CustomEvent<{
    id: string;
    isValid: IsValid;
  }>;
  valueChanged: CustomEvent<string | null>;
  keyup: CustomEvent<KeyboardEvent>
}

export interface DropdownSearchProps {
  canHideHelpers?: boolean;
  clearedValue?: string;
  clearValueOnInit?: boolean;
  displayMode?: AllowedDropdownDisplayMode;
  flipHelpers?: boolean;
  focused?: boolean;
  getValue?: {() : string | number};
  getValues?: {() : Option[]};
  id?: string;
  isEmptyAllowed?: boolean;
  isNewValueAllowed?: boolean;
  maxSuggestions?: number;
  originalValue?: string | number;
  setFocus?: boolean;
  showHelpers?: boolean;
  validators?: ValidatorStore;
  value?: string | number;
  values?: Option[];
}

export const COMPONENT_DROPDOWN_SEARCH = 'dropdown-search'