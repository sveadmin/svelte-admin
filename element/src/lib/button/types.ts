import type {
  Snippet,
} from 'svelte'

import type {
  ControlInputTypes,
  IdOptional,
  NameOptional,
} from '$lib/types.js'

import type {
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  ClassListOptional,
  DataOptional,
  Icon,
  IconProperty,
  IsDisabledOptional,
  LabelOptional,
  OnClickOptional,
  OnKeyDownOptional,
  OnKeyUpOptional,
  OnMouseDownOptional,
  OnMouseUpOptional,
  PaddingOverwriteOptional,
  SizeOptional,
  StyleOptional,
  TabIndexOptional,
  VisibleSize,
} from '$lib/types.js'

import type {
  ImageWrappedProps,
  ImageProps,
} from '$lib/image/index.js'

export const COMPONENT_BUTTON = 'button'

export interface ButtonProps extends
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  ClassListOptional,
  DataOptional,
  IdOptional,
  IsDisabledOptional,
  LabelOptional,
  NameOptional,
  OnClickOptional,
  OnKeyDownOptional,
  OnKeyUpOptional,
  OnMouseDownOptional,
  OnMouseUpOptional,
  PaddingOverwriteOptional,
  SizeOptional,
  StyleOptional,
  TabIndexOptional
{
  childrenConfig?: {
    0?: ImageWrappedProps,
    1?: ImageProps,
  },
  iconRenderer?: Snippet<[Icon[], ImageWrappedProps | undefined]>;
  instance?: {
    ref?: HTMLButtonElement
  };
  isAttachedOnLeft?: boolean;
  isAttachedOnRight?: boolean;
  leftIcon?: IconProperty;
  rightIcon?: IconProperty;
  type?: ControlInputTypes;
  visibleHeight?: VisibleSize;
  visibleWidth?: VisibleSize;
}

export interface ButtonInputProps extends ButtonProps {
}