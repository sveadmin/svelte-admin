import { SvelteComponentTyped } from 'svelte';
import {
  CellComponentProps,
} from '../../types.js'

export default class CellDateIntervalDisplay extends SvelteComponentTyped<CellComponentProps> {}

export type CellDateIntervalDisplayComponent = typeof CellDateIntervalDisplay & SvelteComponentTyped<CellComponentProps>