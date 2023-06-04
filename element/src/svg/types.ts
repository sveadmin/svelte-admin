  import {
    AllowedImageDisplayModes,
  } from '../image/types.js'

export interface SvgProps {
  displayMode: AllowedImageDisplayModes;
  value: string;
  title: string;
}

export const COMPONENT_SVG = 'svg'