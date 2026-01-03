import type {
  Snippet,
} from 'svelte'

import type {
  ClassListOptional,
  DataOptional,
  IdOptional,
  OnClickOptional,
  OnMouseDownOptional,
  OnMouseUpOptional,
  Option,
  OptionStore,
  SizeOptional,
  StyleOptional
} from '$lib/types.js'

export const DISPLAY_TAG_COMBO = 'combo';

export const DISPLAY_TAG_VALUE = 'value';

export const ALLOWED_DROPDOWN_DISPLAY_MODES = [
  DISPLAY_TAG_COMBO,
  DISPLAY_TAG_VALUE
]

export const TAG_TYPE_NEGATIVE = 'negative'

export const TAG_TYPE_NEUTRAL = 'neutral'

export const TAG_TYPE_POSITIVE = 'positive'

export const TAG_TYPE_WARNING = 'warning'

export const ALLOWED_TAG_TYPES = [
  TAG_TYPE_NEGATIVE,
  TAG_TYPE_NEUTRAL,
  TAG_TYPE_POSITIVE,
  TAG_TYPE_WARNING,
]

export type TagType = typeof ALLOWED_TAG_TYPES[number]

export interface Tag {
  format?: string,
  id: string,
  route?: string,
  value: string,
}

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
  optionStore?: OptionStore;
  renderTag?: Snippet<[value: Option | string, optionsStore?: OptionStore]>;
  value?: Option | string;
  // component?: typeof SvelteComponent;
  // componentAttributes?: {[key: string] : any};
  // items: {}[],
  // getValue?: {({}) : string};
  // tagType?: TagType;
  // getTagType?: {({}) : TagType};
}

export const COMPONENT_TAG = 'tag'