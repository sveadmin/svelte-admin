import type {
  Snippet, 
} from 'svelte'

import type {
  ClassListOptional,
  OnClickOptional,
  OnMouseDownOptional,
  OnMouseUpOptional,
  StyleOptional,
  Value,
} from '$lib/types.js'

export const COMPONENT_LINK = 'link'

export interface LinkProps extends
  ClassListOptional,
  OnClickOptional,
  OnMouseDownOptional,
  OnMouseUpOptional,
  StyleOptional,
  Value
{
  baseUrl: string;
  children?: Snippet<[string]>;
  name?: string;
  namedParameters?: {[key: string] : string};
  routeGenerator?: (
    baseUrl: string,
    name: string,
    namedParameters: {[key: string] : string}
  ) => string;
  target?: HrefTarget;
}

export const HREF_TARGET_BLANK = '_blank'

export const HREF_TARGET_PARENT = '_parent'

export const HREF_TARGET_SELF = '_self'

export const HREF_TARGET_TOP = '_top'

export const HREF_TARGET_UNFENCED_TOP = '_unfencedTop'

export const ALLOWED_HREF_TARGET = [
  HREF_TARGET_BLANK,
  HREF_TARGET_PARENT,
  HREF_TARGET_SELF,
  HREF_TARGET_TOP,
  HREF_TARGET_UNFENCED_TOP
]

export type HrefTarget = typeof ALLOWED_HREF_TARGET[number]