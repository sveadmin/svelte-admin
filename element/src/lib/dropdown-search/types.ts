import type {
  Component,
  Snippet
} from 'svelte'

import type {
  AllowedSize,
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  ClassListOptional,
  CommonInputProps,
  DataOptional,
  KeyMap,
  Option,
  OptionIndexed,
  OptionStore,
  StyleOptional,
  SveadminComponent,
  ValueHelperStore,
  ValuesOptional,
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
  childrenConfig?: {
    0?: TextInputProps | {[key: string] : any}; // Any declaration needed as Dropdown accepts Components as paramter.
                                                // Components can have various childrenConfig, bx default TextInput is used
    1?: SuggestedValuesProps;
    input?: TextInputProps | {[key: string] : any};
    suggestedValues?: SuggestedValuesProps;
  };
  componentConfig?: {
    0?: SveadminComponent<undefined, Component<any>>
    input?: SveadminComponent<undefined, Component<any>>;
  };
  getDisplayValue?: (key?: string | null, option?: OptionIndexed) => string | null;
  getKey?:(option: Option) => string;
  isCurrentValueVisible?: boolean;
  isEmptyAllowed?: boolean;
  isInlineClearButtonVisible?: boolean;
  isNewValueAllowed?: boolean;
  isSuggestionListOnTop?: boolean;
  isSuggestionListPinnable?: boolean;
  isSuggestionListVisible?: boolean;
  isValueClearedOnInit?: boolean;
  isValueSetAutomaticallyOnSingleSuggestion?: boolean;
  renderCurrentValue?: renderCurrentValue;
  renderSuggestion?: renderSuggestion;
  suggestionsLength?: number;
  validationData?: {[key: string] : any} | (() => {[key: string] : any})
}

export interface DropdownSearchExportProps {
  getOption?: () => OptionIndexed | undefined;
  toggleFocus?: (event?: Event) => boolean;
  toggleSelectionInProgress?: (event?: Event) => boolean;
}

export interface ComponentDropdown extends SveadminComponent<
  typeof COMPONENT_DROPDOWN_SEARCH,
  undefined,
  undefined,
  DropdownSearchInputProps
>
{
}

export type renderCurrentValue = Snippet<[
  key: string | null,
  size?: AllowedSize,
  onMouseDown?: (event: Event) => void,
  onMouseUp?: (event: Event) => void,
  onKeyUp?: (event: Event) => void,
  isSuggestionListOnTop?: boolean,
  options?: OptionStore,
]>

export type renderSuggestion = Snippet<[
  suggestion: string | null | null,
  isSelected: boolean,
  onMouseDown: (event: Event) => void,
  onMouseUp: (event: Event) => void,
  onKeyUp: (event: Event) => void,
  options?: OptionStore,
]>

export interface SuggestedValuesProps extends
  ClassListOptional,
  DataOptional,
  StyleOptional
{

}

export interface SuggestionHandlerProps {
  keyMap: KeyMap,
  onKeyUp?: (event: KeyboardEvent) => void,
  options: OptionStore,
  suggestions: SuggestionStore,
  valueHelper: ValueHelperStore,
}

export interface SuggestionStore {
  list: Array<string | null>;
  selected: number;
}