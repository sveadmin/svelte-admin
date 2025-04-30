import type {
  ContainerClassListOptional,
  ContainerStyleOptional,
  KeyMap,
  DisplayModeOptional,
  ValuesOptional,
} from '$lib/types.js'

import type {
  TextInputProps,
} from '$lib/text-input/types.js'

export const COMPONENT_DROPDOWN_SEARCH = 'dropdown-search'

export interface ChangeValueProps {
  clearValueOnInit: boolean,
  getDisplayValue: (value: string | number | null) => string | null,
  onChange?: (value: any) => void,
  validateValue: (value: any) => boolean,
  valueHelper: ValueHelperStore,
}

export interface DropdownSearchProps extends
  TextInputProps,
  ContainerClassListOptional,
  ContainerStyleOptional,
  DisplayModeOptional,
  ValuesOptional
{
  areHelpersFlipped?: boolean;
  areHelpersVisible?: boolean;
  clearValueOnInit?: boolean;
  isEmptyAllowed?: boolean;
  isNewValueAllowed?: boolean;
  suggestionsLength?: number;
  validationData?: {[key: string] : any} | (() => {[key: string] : any})
}

export interface SuggestionHandlerProps {
  keyMap: KeyMap,
  generateSuggestions: (value?: string | number | null) => Array<string | null>,
  onKeyup?: (event: KeyboardEvent) => void,
  suggestions: SuggestionStore,
  valueHelper: ValueHelperStore,
}

export interface SuggestionStore {
  list: Array<string | null>;
  selected: number;
}

export interface ValueHelperStore {
  current: string | number | null,
  inputFocused: boolean,
  display: string | null,
  original: string | number | null,
  suggestionSelectionInProgress: boolean,
  value: string | number | null,
}
