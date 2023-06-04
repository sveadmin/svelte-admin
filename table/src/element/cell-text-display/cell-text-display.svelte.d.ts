import { SvelteComponentTyped } from 'svelte';
import {
  CellComponentProps,
} from '../../types.js'

export default class CellTextDisplay extends SvelteComponentTyped<CellComponentProps> {}

export type CellTextDisplayComponent = typeof CellTextDisplay & SvelteComponentTyped<CellComponentProps>