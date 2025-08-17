import type {
  Snippet
} from 'svelte'

import type {
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  KeyMap,
  DisplayModeOptional,
  ValuesOptional,
  ValueHelperStore,
  CommonInputProps,
  AllowedSize,
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
  Omit<TextInputProps, 'type'>,
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  DisplayModeOptional,
  ValuesOptional
{
  childrenConfig?: {
    0?: TextInputProps;
  };
  autoCompleteOnSingleSuggestion?: boolean;
  clearValueOnInit?: boolean;
  isCurrentValueVisible?: boolean;
  isEmptyAllowed?: boolean;
  isNewValueAllowed?: boolean;
  isSuggestionListOnTop?: boolean;
  isSuggestionListPinnable?: boolean;
  isSuggestionListVisible?: boolean;
  renderCurrentValue?: Snippet<[
    valueHelper: ValueHelperStore,
    getDisplayValue: (value: string | number | null) => string | null,
    onMouseDown: (event: Event) => void,
    onMouseUp: (event: Event) => void,
    onKeyUp: (event: Event) => void,
    isSuggestionListOnTop: boolean
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
  CommonInputProps,
  DropdownSearchProps
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