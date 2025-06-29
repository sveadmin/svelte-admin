import type {
  Snippet,
} from 'svelte'

import type {
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  ClassListOptional,
  IconProperty,
  OnClickOptional,
  StyleOptional,
  VisibleSize,
} from '$lib/types.js'

export const COMPONENT_IMAGE = 'image'

export interface EditorPartImage {
  isAttachedOnLeft?: boolean;
  isAttachedOnRight?: boolean;
  seamless?: boolean;
}

export interface InputPartImage extends ImageWrappedProps {
  editor?: EditorPartImage;
  type: typeof COMPONENT_IMAGE
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


export interface IconProps extends ImageProps {
  icon: string;
  iconPrefix?: string;
}

export interface ImageMapProps extends ImageProps {
  map: {[key: string] : any | ((value: any) => boolean)};
  value: any;
}

export interface ImageProps extends ClassListOptional,
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

export interface ImageWrappedProps extends ChildrenClassListOptional,
  ChildrenStyleOptional,
  ImageProps,
  OnClickOptional
{
  children?: {
    0?: ImageProps,
  },
  childrenVisibleHeight?: VisibleSize;
  childrenVisibleWidth?: VisibleSize;
  icon?: IconProperty;
  iconPrefix?: string;
  image?: Snippet<[ImageProps]>;
  isAttachedOnLeft?: boolean;
  isAttachedOnRight?: boolean;
  isBorderVisible?: boolean;
  isImageDisplayed?: boolean;
  isInPreviewMode?: boolean;
  isPreviewModeOnHover?: boolean;
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