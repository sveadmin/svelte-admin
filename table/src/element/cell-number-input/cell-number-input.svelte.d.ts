import { SvelteComponentTyped } from 'svelte';
import {
  CellNumberInputProps,
} from './types.js'

export default class CellNumberInput extends SvelteComponentTyped<CellNumberInputProps> {}

export type CellNumberInputComponent = typeof CellNumberInput & SvelteComponentTyped<CellNumberInputProps>