import type {
  Snippet,
} from 'svelte'

import type {
  ClassListOptional,
  DataOptional,
  Icon,
  IconProperty,
  IdOptional,
  OnClickOptional,
  OnMouseDownOptional,
  OnMouseUpOptional,
  Option,
  OptionStore,
  SizeOptional,
  StyleOptional
} from '$lib/types.js'

import type {
  ButtonInputProps,
} from '$lib/button/index.js'

import type {
  ImageWrappedProps,
} from '$lib/image/index.js'

export interface TagProps extends 
  ClassListOptional,
  DataOptional,
  IdOptional,
  OnClickOptional,
  OnMouseDownOptional,
  OnMouseUpOptional,
  SizeOptional,
  StyleOptional
{
  action?: ButtonInputProps | ButtonInputProps[];
  buttonClass: string | string[];
  buttonStyle: string | string[];
  children: Snippet;
  childrenConfig?: {
    0?: ImageWrappedProps;
    1?: ButtonInputProps;
  },
  icon?: IconProperty;
  iconClass: string | string[];
  iconRenderer?: Snippet<[Icon[], ImageWrappedProps | undefined]>;
  iconStyle: string | string[];
  optionStore?: OptionStore;
  renderTag?: Snippet<[value: Option | string, optionsStore?: OptionStore]>;
  value?: Option | string;
}

export const COMPONENT_TAG = 'tag'