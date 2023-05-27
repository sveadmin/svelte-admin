import { SvelteComponentTyped } from 'svelte';
import {
  CellSvgProps,
} from './types.js'

export default class CellSvg extends SvelteComponentTyped<CellSvgProps> {}

export type CellSvgComponent = typeof CellSvg & SvelteComponentTyped<CellSvgProps>