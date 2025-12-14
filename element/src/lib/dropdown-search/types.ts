import type {
  Component,
  Snippet
} from 'svelte'

import type {
  AllowedDisplayMode,
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  CommonInputProps,
  DisplayModeOptional,
  KeyMap,
  Option,
  ValuesOptional,
  ValueHelperStore,
  OptionIndexed,
  OptionStore,
} from '$lib/types.js'

import type {
  TextInputProps,
} from '$lib/text-input/types.js'

export const COMPONENT_DROPDOWN_SEARCH = 'dropdown-search'

export interface ChangeValueProps {
  onChange?: (value: any) => void,
  validateValue: (value: any) => boolean,
  valueHelper: ValueHelperStore,
  options: OptionStore,
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
  getDisplayValue?: (value: string | number | null, option?: OptionIndexed) => string | null;
  inputComponent?: Component<TextInputProps>;
  isCurrentValueVisible?: boolean;
  isEmptyAllowed?: boolean;
  isNewValueAllowed?: boolean;
  isSuggestionListOnTop?: boolean;
  isSuggestionListPinnable?: boolean;
  isSuggestionListVisible?: boolean;
  renderCurrentValue?: Snippet<[
    value: string | number | null,
    onMouseDown: (event: Event) => void,
    onMouseUp: (event: Event) => void,
    onKeyUp: (event: Event) => void,
    isSuggestionListOnTop: boolean,
    options?: OptionStore,
  ]>;
  renderSuggestion?: Snippet<[
    suggestion: string | number | null | null,
    isSelected: boolean,
    onMouseDown: (event: Event) => void,
    onMouseUp: (event: Event) => void,
    onKeyUp: (event: Event) => void,
    options?: OptionStore,
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