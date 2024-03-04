import { SvelteComponentTyped } from 'svelte';
import {
  RangeInputEvents,
  RangeInputProps,
} from './types.js'

export default class RangeInput extends SvelteComponentTyped<RangeInputProps> {}

export type RangeInputComponent = typeof RangeInput & SvelteComponentTyped<RangeInputProps, RangeInputEvents>