import type {
  ClassListOptional,
  ContainerClassListOptional,
  ContainerStyleOptional,
  OnClickOptional,
  StyleOptional,
} from '$lib/types.js'

import type {
  NumberSignDisplay,
  NumberUseGrouping,
  RoundingIncrements,
  NumberRoundingMode,
  TextDisplayProps,
} from '$lib/text-display/types.js'

export const COMPONENT_NUMBER_DISPLAY = 'number-display'

export interface NumberDisplayProps extends
  TextDisplayProps
{
  fractionDigits?: number | [number, number];
  locale?: string;
  removeIntegerPart?: boolean;
  roundingMode?: NumberRoundingMode;
  signDisplay?: NumberSignDisplay;
  useGrouping?: NumberUseGrouping;
  value: string | number;
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
  digitsToFractionRatio?: [number, number]
}