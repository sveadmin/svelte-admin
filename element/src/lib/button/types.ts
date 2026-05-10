import type {
  Snippet,
} from 'svelte'

import type {
  ControlInputTypes,
  IdOptional,
  NameOptional,
  OnBlurOptional,
  OnFocusOptional,
  SveadminComponent,
  SveadminElementConfig,
} from '$lib/types.js'

import type {
  AllowedButtonLevel,
  ClassListOptional,
  DataOptional,
  Icon,
  IconProperty,
  IsDisabledOptional,
  IsStaticOptional,
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
  IsStaticOptional,
  LabelOptional,
  NameOptional,
  OnBlurOptional,
  OnClickOptional,
  OnFocusOptional,
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
  level?: AllowedButtonLevel;
  rightIcon?: IconProperty;
  type?: ControlInputTypes;
  visibleHeight?: VisibleSize;
  visibleWidth?: VisibleSize;
}

export interface ComponentButton extends SveadminComponent<
  typeof COMPONENT_BUTTON,
  undefined,
  undefined,
  ButtonInputProps
>
{
}