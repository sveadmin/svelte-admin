import type {
  Snippet,
} from 'svelte'

import type {
  TextDisplayProps,
} from '$lib/text-display/index.js'

import type {
  ClassListOptional,
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  ElementInstanceOptional,
  IdOptional,
  IsDisabledOptional,
  KeyMap,
  LabelOptional,
  NameOptional,
  StyleOptional,
  ValidatorsOptional,
} from '$lib/types.js'


export const COMPONENT_TEXT_INPUT = 'text-input'

export const INPUT_TYPE_NUMBER = 'number'

export const INPUT_TYPE_PASSWORD = 'password'

export const INPUT_TYPE_TEXT = 'text'

export const INPUT_TYPES = [
  INPUT_TYPE_NUMBER,
  INPUT_TYPE_PASSWORD,
  INPUT_TYPE_TEXT
]

export type InputTypes = typeof INPUT_TYPES[number]

export interface TextInputProps extends
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  ClassListOptional,
  ElementInstanceOptional,
  IdOptional,
  IsDisabledOptional,
  LabelOptional,
  NameOptional,
  StyleOptional,
  TextDisplayProps,
  ValidatorsOptional
{
  areErrorsVisible?: boolean;
  autoFocus?: boolean;
  focused?: boolean;
  keyMap?: KeyMap;
  onBlur?: (event: Event) => void;
  onChange?: (value: any) => void;
  onError?: (error: Error) => void;
  onInit?: (el: HTMLElement) => void;
  onFocus?: (event?: Event) => void;
  onKeyup?: (event: KeyboardEvent) => void;
  type?: InputTypes;
  validateWhenLoaded?: boolean;
  validateWhileTyping?: boolean;
}

export interface TextInputWrappedProps extends TextInputProps {
  input?: Snippet<[TextInputProps]>,
}