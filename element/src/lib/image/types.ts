import type {
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  ClassListOptional,
  IconOptional,
  OnClickOptional,
  StyleOptional,
  VisibleSize,
} from '$lib/types.js'

export const COMPONENT_IMAGE = 'image'

export const DISPLAY_IMAGE_ICON = 'icon'

export const DISPLAY_IMAGE_NORMAL = 'normal'

export const DISPLAY_IMAGE_PREVIEW = 'preview'

export const ALLOWED_IMAGE_DISPLAY_MODES = [
  DISPLAY_IMAGE_ICON,
  DISPLAY_IMAGE_NORMAL,
  DISPLAY_IMAGE_PREVIEW,
]

export type AllowedImageDisplayModes = typeof ALLOWED_IMAGE_DISPLAY_MODES[number]

export const FETCHPRIORITY_AUTO = 'auto'

export const FETCHPRIORITY_HIGH = 'high'

export const FETCHPRIORITY_LOW = 'low'

export const ALLOWED_FETCHPRIORITIES = [
  FETCHPRIORITY_AUTO,
  FETCHPRIORITY_HIGH,
  FETCHPRIORITY_LOW
]

export type AllowedFetchpriorities = typeof ALLOWED_FETCHPRIORITIES[number] 


export interface IconProps extends ImageProps{
  icon: string;
  iconPrefix?: string;
}

export interface ImageProps extends ClassListOptional,
  StyleOptional
{
  alt?: string;
  fetchpriority?: AllowedFetchpriorities;
  loading?: AllowedLoadings;
  sizes?: string | Array<string | SizeDefinition>;
  src?: string;
  srcset?: string | Array<string | SourceSetDefinition>;
  visibleHeight?: VisibleSize;
  visibleWidth?: VisibleSize;
}

export interface ImageWrappedProps extends ChildrenClassListOptional,
  ChildrenStyleOptional,
  IconOptional,
  ImageProps,
  OnClickOptional
{
  childrenHeight?: VisibleSize;
  childrenWidth?: VisibleSize;
  isImageVisibleInWrapper?: boolean;
  isPreviewEnabled?: boolean;
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