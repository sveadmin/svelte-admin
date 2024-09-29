import {
  Writable,
} from 'svelte/store'

import {
  FlexDefinition,
} from '@sveadmin/common'

export const BOUNDARY_LOWER = 'lower'

export const BOUNDARY_UPPER = 'upper'

export const BOUNDARIES = [
  BOUNDARY_LOWER,
  BOUNDARY_UPPER,
]

export const BOUNDARY_OPPOSITES = {
  BOUNDARY_LOWER: BOUNDARY_UPPER,
  BOUNDARY_UPPER : BOUNDARY_LOWER,
}

export type Boundaries = typeof BOUNDARIES[number]

export interface BoundaryData {
  [BOUNDARY_LOWER]: number;
  [BOUNDARY_UPPER]: number;
}

export interface BoundaryStore extends Writable<BoundaryData> {
  setLower: (lower: number) => void;
  setUpper: (upper: number) => void;
}

export interface BoundaryStoreConstructor {
  [BOUNDARY_LOWER]: number;
  [BOUNDARY_UPPER]: number;
}

export const RANGE_INPUT_ORIENTATION_HORIZONTAL = 'horizontal'

export const RANGE_INPUT_ORIENTATION_VERTICAL = 'vertical'

export const RANGE_INPUT_ORIENTATIONS = [
  RANGE_INPUT_ORIENTATION_HORIZONTAL,
  RANGE_INPUT_ORIENTATION_VERTICAL
]

export type RangeInputOrientation = typeof RANGE_INPUT_ORIENTATIONS[number]

export const RANGE_INPUT_EVENT_SET_LOWER = 'setLower'

export const RANGE_INPUT_EVENT_SET_UPPER = 'setUpper'

export interface RangeInputEvents {
  [RANGE_INPUT_EVENT_SET_LOWER]: CustomEvent<number>;
  [RANGE_INPUT_EVENT_SET_UPPER]: CustomEvent<number>;
}

export interface RangeInputProps {
  orientation: RangeInputOrientation;
  steps: number;
  stepSizes: FlexDefinition[];
}

export const COMPONENT_RANGE_INPUT = 'range-input'