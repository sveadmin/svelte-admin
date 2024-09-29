import type {
  ClassListOptional,
  DisplayModeOptional,
  IdOptional,
  StyleOptional,
  ValidatorsOptional,
  ValueOptional,
  ValuesOptional,
} from '../types.js'

export interface DropdownSearchProps extends
  ClassListOptional,
  DisplayModeOptional,
  IdOptional,
  StyleOptional,
  ValidatorsOptional,
  ValueOptional,
  ValuesOptional
{
  areHelpersVisible?: boolean;
  // clearedValue?: string;
  clearValueOnInit?: boolean;
  flipHelpers?: boolean;
  focused?: boolean;
  getValidationData?: () => {};
  isEmptyAllowed?: boolean;
  isNewValueAllowed?: boolean;
  // originalValue?: string | number;
  setFocus?: boolean;
  suggestionsLength?: number;
}

export const COMPONENT_DROPDOWN_SEARCH = 'dropdown-search'