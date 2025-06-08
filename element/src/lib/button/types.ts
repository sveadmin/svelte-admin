import type {
  Snippet,
} from 'svelte'

import type {
  Callback,
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
} from '../types.js'

export const COMPONENT_BUTTON = 'button'

export interface ButtonProps extends
  Callback,
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
  visibleHeight?: VisibleSize;
  visibleWidth?: VisibleSize;
}
