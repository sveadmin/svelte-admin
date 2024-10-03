import type {
  ClassListOptional,
  DisplayModeOptional,
  IdOptional,
  StyleOptional,
  ValidatorsOptional,
  ValueOptional,
  ValuesOptional,
} from '$lib/types.js'

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
  onChange?: (value: any) => void;
  onError?: (error: Error) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  // originalValue?: string | number;
  setFocus?: boolean;
  suggestionsLength?: number;
}

export const COMPONENT_DROPDOWN_SEARCH = 'dropdown-search'