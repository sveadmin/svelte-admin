import { SvelteComponentTyped } from 'svelte';
import {
  CellComponentProps,
} from '../../types.js'

export default class CellTextInput extends SvelteComponentTyped<CellComponentProps> {}

export type CellTextInputComponent = typeof CellTextInput & SvelteComponentTyped<CellComponentProps>