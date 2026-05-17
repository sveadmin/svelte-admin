import type {
  Snippet,
} from 'svelte'

import type {
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  ClassListOptional,
  DataOptional,
  IconProperty,
  OnClickOptional,
  OnMouseDownOptional,
  OnMouseUpOptional,
  SizeOptional,
  SveadminComponent,
  StyleOptional,
  TabIndexOptional,
  VisibleSize,
} from '$lib/types.js'
import type { AriaOptional, IsAttachedOnLeftOptional, IsAttachedOnRightOptional } from '$lib/component-common-properties.js';

export const COMPONENT_IMAGE = 'image'

export const COMPONENT_IMAGE_WRAPPED = 'image-wrapped'

export interface ComponentImage extends SveadminComponent<
  typeof COMPONENT_IMAGE,
  undefined,
  ImageDisplayProps
>
{
}

export interface ComponentImageWrapped extends SveadminComponent<
  typeof COMPONENT_IMAGE_WRAPPED,
  undefined,
  ImageWrappedDisplayProps
>
{
}

export const FETCHPRIORITY_AUTO = 'auto'

export const FETCHPRIORITY_HIGH = 'high'

export const FETCHPRIORITY_LOW = 'low'

export const ALLOWED_FETCHPRIORITIES = [
  FETCHPRIORITY_AUTO,
  FETCHPRIORITY_HIGH,
  FETCHPRIORITY_LOW
]

export type AllowedFetchpriorities = typeof ALLOWED_FETCHPRIORITIES[number] 

export interface ImageMapProps extends ImageDisplayProps {
  map: {[key: string] : any | ((value: any) => boolean)};
  value: any;
}

export interface ImageDisplayProps extends ClassListOptional,
  StyleOptional
{
  alt?: string;
  fetchpriority?: AllowedFetchpriorities | null;
  loading?: AllowedLoadings | null;
  sizes?: string | Array<string | SizeDefinition>;
  src?: string;
  srcset?: string | Array<string | SourceSetDefinition>;
  visibleHeight?: VisibleSize;
  visibleWidth?: VisibleSize;
}

export interface ImageWrappedDisplayProps extends AriaOptional,
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  DataOptional,
  ImageDisplayProps,
  IsAttachedOnLeftOptional,
  IsAttachedOnRightOptional,
  OnClickOptional,
  OnMouseDownOptional,
  OnMouseUpOptional,
  SizeOptional,
  TabIndexOptional
{
  childrenConfig?: {
    0?: ImageDisplayProps,
  },
  childrenVisibleHeight?: VisibleSize;
  childrenVisibleWidth?: VisibleSize;
  icon?: IconProperty;
  iconPrefix?: string;
  image?: Snippet<[ImageDisplayProps]>;
  isAttachedOnLeft?: boolean;
  isAttachedOnRight?: boolean;
  isOutlineVisible?: boolean;
  isImageDisplayed?: boolean;
  isInPreviewMode?: boolean;
  isPreviewModeOnHover?: boolean;
  seamless?: boolean;
}

export const LOADING_EAGER = 'eager'

export const LOADING_LAZY = 'lazy'

export const ALLOWED_LOADINGS = [
  LOADING_EAGER,
  LOADING_LAZY
]

export type AllowedLoadings = typeof ALLOWED_LOADINGS[number]

export interface SizeDefinition {
  attribute: string;
  condition: VisibleSize;
  value: VisibleSize;
}

export interface SourceSetDefinition {
  src: string;
  size?: Number;
  unit?: 'w' | 'x';
}