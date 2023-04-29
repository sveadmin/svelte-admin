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
  id?: string;
  isEmptyAllowed?: boolean;
  isNewValueAllowed?: boolean;
  flipHelpers?: boolean;
  focused?: boolean;
  originalValue?: string | number;
  maxSuggestions?: number;
  setFocus?: boolean;
  showHelpers?: boolean;
  validators?: ValidatorStore;
  value?: string | number;
  values?: Array<Option>;
}