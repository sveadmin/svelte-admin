import { SvelteComponentTyped } from 'svelte';
import {
  CellTextDisplayProps,
} from './types.js'

export default class CellTextDisplay extends SvelteComponentTyped<CellTextDisplayProps> {}

export type CellTextDisplayComponent = typeof CellTextDisplay & SvelteComponentTyped<CellTextDisplayProps>