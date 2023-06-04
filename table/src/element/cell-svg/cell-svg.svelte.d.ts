import { SvelteComponentTyped } from 'svelte';
import {
  CellComponentProps,
} from '../../types.js'

export default class CellSvg extends SvelteComponentTyped<CellComponentProps> {}

export type CellSvgComponent = typeof CellSvg & SvelteComponentTyped<CellComponentProps>