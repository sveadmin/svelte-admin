import { SvelteComponent } from 'svelte'

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

export interface TagProps {
  component?: SvelteComponent;
  componentAttributes?: {[key: string] : any};
  items: {}[],
  getValue?: {({}) : string};
  tagType?: TagType;
  getTagType?: {({}) : TagType};
}

export const COMPONENT_TAG = 'tag'