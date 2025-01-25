import type {
  ClassListOptional,
  ContainerClassListOptional,
  ContainerStyleOptional,
  OnClickOptional,
  StyleOptional,
} from '$lib/types.js'

import type {
  NumberDisplayProps,
} from '$lib/number-display/types.js'

import type {
  NumberUnitDisplay,
} from '$lib/text-display/types.js'

export const COMPONENT_NUMBER_DISPLAY = 'number-display'

export interface UnitDisplayProps extends
  NumberDisplayProps
{
  unit?: string; //https://tc39.es/ecma402/#table-sanctioned-single-unit-identifiers
  unitDisplay?: NumberUnitDisplay;
}

export interface UnitDisplayWrappedProps extends
  ClassListOptional,
  ContainerClassListOptional,
  ContainerStyleOptional,
  OnClickOptional,
  StyleOptional,
  UnitDisplayProps
{
  digitsToFractionRatio?: [number, number]
}