import type {
  Snippet,
} from 'svelte'

import type {
  ControlInputTypes,
} from '$lib/types.js'

import type {
  Callback,
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  ClassListOptional,
  DataOptional,
  Icon,
  IconProperty,
  IsDisabledOptional,
  LabelOptional,
  paddingOverwriteOptional,
  SizeOptional,
  StyleOptional,
  TabIndexOptional,
  VisibleSize,
} from '$lib/types.js'

export const COMPONENT_BUTTON = 'button'

export interface ButtonProps extends
  Callback,
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  ClassListOptional,
  DataOptional,
  IsDisabledOptional,
  LabelOptional,
  paddingOverwriteOptional,
  SizeOptional,
  StyleOptional,
  TabIndexOptional
{
  iconRenderer?: Snippet<[Icon[]]>;
  leftIcon?: IconProperty;
  rightIcon?: IconProperty;
  type?: ControlInputTypes;
  visibleHeight?: VisibleSize;
  visibleWidth?: VisibleSize;
}

export interface ButtonInputProps extends ButtonProps {
}