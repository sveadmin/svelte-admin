import { SvelteComponentTyped } from 'svelte';
import {
  CellJsonProps,
} from './types.js'


export default class CellJson extends SvelteComponentTyped<CellJsonProps> {}

export type CellJsonComponent = typeof CellJson & SvelteComponentTyped<CellJsonProps>