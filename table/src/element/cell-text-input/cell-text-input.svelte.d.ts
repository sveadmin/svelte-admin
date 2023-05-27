import { SvelteComponentTyped } from 'svelte';
import {
  CellTextInputProps,
} from './types.js'

export default class CellTextInput extends SvelteComponentTyped<CellTextInputProps> {}

export type CellTextInputComponent = typeof CellTextInput & SvelteComponentTyped<CellTextInputProps>