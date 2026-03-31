import type {
  Snippet,
} from 'svelte'

import type {
  ControlInputTypes,
  IdOptional,
  NameOptional,
  SveadminComponent,
  SveadminElementConfig,
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
  ImageWrappedDisplayProps,
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
  SveadminElementConfig,
  StyleOptional,
  TabIndexOptional
{
  childrenConfig?: {
    0?: ImageWrappedDisplayProps,
    icon?: ImageWrappedDisplayProps,
    leftIcon?: ImageWrappedDisplayProps,
    rightIcon?: ImageWrappedDisplayProps,
  },
  icon?: IconProperty;
  iconClass?: string | string[];
  iconRenderer?: Snippet<[Icon[], ImageWrappedDisplayProps | undefined]>;
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

export interface ComponentButton extends SveadminComponent<
  typeof COMPONENT_BUTTON,
  undefined,
  ButtonInputProps
>
{
}