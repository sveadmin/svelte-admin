import type {
  Snippet,
} from 'svelte'

import type {
  ControlInputTypes,
  IdOptional,
  NameOptional,
  SveadminComponent,
} from '$lib/types.js'

import type {
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

export interface ButtonInputProps extends
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
  SizeOptional,
  StyleOptional,
  TabIndexOptional
{
  childrenConfig?: {
    0?: ImageWrappedProps,
    icon?: ImageWrappedProps,
    leftIcon?: ImageWrappedProps,
    rightIcon?: ImageWrappedProps,
  },
  icon?: IconProperty;
  iconClass?: string | string[];
  iconRenderer?: Snippet<[Icon[], ImageWrappedProps | undefined]>;
  iconStyle?: string | string[];
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

export interface SveaComponentButton extends SveadminComponent
{
  input?: {
    config: ButtonInputProps;
  };
  type: typeof COMPONENT_BUTTON
}