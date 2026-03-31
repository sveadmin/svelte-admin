import type {
  Component,
  Snippet
} from 'svelte'

import type {
  AllowedSize,
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  CommonInputProps,
  KeyMap,
  Option,
  ValuesOptional,
  ValueHelperStore,
  OptionIndexed,
  OptionStore,
  ClassListOptional,
  StyleOptional,
  SveadminComponent,
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

export interface DropdownSearchInputProps extends
  Omit<TextInputProps, 'type'>,
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  ValuesOptional
{
  callbacks?: {
    getOption?: () => OptionIndexed | undefined;
    toggleFocus?: (event?: Event) => boolean;
  },
  childrenConfig?: {
    0?: TextInputProps | {[key: string] : any}; // Any declaration needed as Dropdown accepts Components as paramter.
                                                // Components can have various childrenConfig, bx default TextInput is used
    1?: SuggestedValuesProps;
    input?: TextInputProps | {[key: string] : any};
    suggestedValues?: SuggestedValuesProps;
  };
  autoCompleteOnSingleSuggestion?: boolean;
  clearValueOnInit?: boolean;
  getDisplayValue?: (key?: string | null, option?: OptionIndexed) => string | null;
  getKey?:(option: Option) => string;
  inputComponent?: Component<TextInputProps>;
  isCurrentValueVisible?: boolean;
  isEmptyAllowed?: boolean;
  isNewValueAllowed?: boolean;
  isSuggestionListOnTop?: boolean;
  isSuggestionListPinnable?: boolean;
  isSuggestionListVisible?: boolean;
  renderCurrentValue?: Snippet<[
    key: string | null,
    size?: AllowedSize,
    onMouseDown?: (event: Event) => void,
    onMouseUp?: (event: Event) => void,
    onKeyUp?: (event: Event) => void,
    isSuggestionListOnTop?: boolean,
    options?: OptionStore,
  ]>;
  renderSuggestion?: Snippet<[
    suggestion: string | null | null,
    isSelected: boolean,
    onMouseDown: (event: Event) => void,
    onMouseUp: (event: Event) => void,
    onKeyUp: (event: Event) => void,
    options?: OptionStore,
  ]>;
  suggestionsLength?: number;
  validationData?: {[key: string] : any} | (() => {[key: string] : any})
}

export interface ComponentDropdown extends SveadminComponent<
  typeof COMPONENT_DROPDOWN_SEARCH,
  undefined,
  DropdownSearchInputProps
>
{
}

export interface SuggestedValuesProps extends
  ClassListOptional,
  StyleOptional
{

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