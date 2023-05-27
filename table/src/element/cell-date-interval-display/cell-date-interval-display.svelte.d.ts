import { SvelteComponentTyped } from 'svelte';
import {
  CellDateIntervalDisplayProps,
} from './types.js'

export default class CellDateIntervalDisplay extends SvelteComponentTyped<CellDateIntervalDisplayProps> {}

export type CellDateIntervalDisplayComponent = typeof CellDateIntervalDisplay & SvelteComponentTyped<CellDateIntervalDisplayProps>