export interface ImageProps {
  alt: string;
  preview: boolean;
  src: string;
}

export const DISPLAY_IMAGE_ICON = 'icon'

export const DISPLAY_IMAGE_NORMAL = 'normal'

export const DISPLAY_IMAGE_PREVIEW = 'preview'

export const ALLOWED_IMAGE_DISPLAY_MODES = [
  DISPLAY_IMAGE_ICON,
  DISPLAY_IMAGE_NORMAL,
  DISPLAY_IMAGE_PREVIEW,
]

export type AllowedImageDisplayModes = typeof ALLOWED_IMAGE_DISPLAY_MODES[number]

export const COMPONENT_IMAGE = 'image'