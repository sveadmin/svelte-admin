import type {
  Snippet
} from 'svelte'

import type {
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  KeyMap,
  DisplayModeOptional,
  ValuesOptional,
  IsAttachedOnLeftOptional,
  IsAttachedOnRightOptional,
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
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  DisplayModeOptional,
  ValuesOptional
{
  areHelpersFlipped?: boolean;
  areHelpersVisible?: boolean;
  childrenConfig?: {
    0?: TextInputProps;
  };
  clearValueOnInit?: boolean;
  isEmptyAllowed?: boolean;
  isNewValueAllowed?: boolean;
  isSuggestionListPinnable?: boolean;
  renderCurrentValue?: Snippet<[
    valueHelper: ValueHelperStore,
    getDisplayValue: (value: string | number | null) => string | null,
    onMouseDown: (event: Event) => void,
    onMouseUp: (event: Event) => void,
    onKeyUp: (event: Event) => void,
    areHelpersFlipped: boolean
  ]>;
  renderSuggestion?: Snippet<[
    suggestion: string | number | null | null,
    isSelected: boolean,
    getDisplayValue: (value: string | number | null) => string | null,
    onMouseDown: (event: Event) => void,
    onMouseUp: (event: Event) => void,
    onKeyUp: (event: Event) => void,
  ]>;
  suggestionsLength?: number;
  validationData?: {[key: string] : any} | (() => {[key: string] : any})
}

export interface EditorPartDropdown {
}

export interface InputPartDropdown extends 
  DropdownSearchProps,
  IsAttachedOnLeftOptional,
  IsAttachedOnRightOptional
{
  editor?: EditorPartDropdown,
  type: typeof COMPONENT_DROPDOWN_SEARCH,
}

export interface SuggestionHandlerProps {
  keyMap: KeyMap,
  generateSuggestions: (value?: string | number | null) => Array<string | null>,
  onKeyUp?: (event: KeyboardEvent) => void,
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
