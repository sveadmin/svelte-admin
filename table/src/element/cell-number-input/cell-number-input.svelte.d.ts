import { SvelteComponentTyped } from 'svelte';
import {
  CellComponentProps,
} from '../../types.js'

export default class CellNumberInput extends SvelteComponentTyped<CellComponentProps> {}

export type CellNumberInputComponent = typeof CellNumberInput & SvelteComponentTyped<CellComponentProps>