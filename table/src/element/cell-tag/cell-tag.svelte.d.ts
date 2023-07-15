import { SvelteComponentTyped } from 'svelte';
import {
  CellTagProps,
} from './types.js'


export default class CellTag extends SvelteComponentTyped<CellTagProps> {}

export type CellTagComponent = typeof CellTag & SvelteComponentTyped<CellTagProps>