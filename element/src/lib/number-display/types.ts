import type {
  ClassListOptional,
  ContainerClassListOptional,
  ContainerStyleOptional,
  OnClickOptional,
  StyleOptional,
  SveadminComponent,
} from '$lib/types.js'

import type {
  NumberSignDisplay,
  NumberUseGrouping,
  NumberRoundingMode,
} from '$lib/number/index.js'

import type {
  TextDisplayProps,
} from '$lib/text-display/types.js'

export const COMPONENT_NUMBER_DISPLAY = 'number-display'

export interface ComponentNumberDisplay extends SveadminComponent<
  typeof COMPONENT_NUMBER_DISPLAY,
  undefined,
  NumberDisplayProps
>
{
}

export interface NumberDisplayProps extends
  TextDisplayProps
{
  fractionDigits?: number | [number, number];
  locale?: string;
  removeIntegerPart?: boolean;
  roundingMode?: NumberRoundingMode;
  signDisplay?: NumberSignDisplay;
  useGrouping?: NumberUseGrouping;
  zeroPadded?: number;
}

export interface NumberDisplayWrappedProps extends
  ClassListOptional,
  ContainerClassListOptional,
  ContainerStyleOptional,
  OnClickOptional,
  StyleOptional,
  NumberDisplayProps
{
  childrenConfig?: {
    0?: NumberDisplayProps,
    1?: NumberDisplayProps,
    digit?: NumberDisplayProps,
    fraction?: NumberDisplayProps,
  },
  digitWidth?: string | number,
  fractionWidth?: string | number,
}