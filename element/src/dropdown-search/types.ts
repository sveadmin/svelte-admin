import {
  IsValid,
  ValidatorStore,
} from '@sveadmin/common'

export type Option = {
  id: string;
  value: string;
}

export const DISPLAY_COMBO = 'combo';

export const DISPLAY_LABEL = 'label';

export const DISPLAY_VALUE = 'value';

export const ALLOWED_DISPLAY_MODES = [
  DISPLAY_COMBO,
  DISPLAY_LABEL,
  DISPLAY_VALUE
]

export type AllowedDisplayMode = typeof ALLOWED_DISPLAY_MODES[number]

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
  displayMode?: AllowedDisplayMode;
  flipHelpers?: boolean;
  focused?: boolean;
  getValue?: {() : string | number};
  getValues?: {() : Array<Option>};
  id?: string;
  isEmptyAllowed?: boolean;
  isNewValueAllowed?: boolean;
  maxSuggestions?: number;
  originalValue?: string | number;
  setFocus?: boolean;
  showHelpers?: boolean;
  validators?: ValidatorStore;
  value?: string | number;
  values?: Array<Option>;
}

export const COMPONENT_DROPDOWN_SEARCH = 'dropdown-search'