import { SvelteComponentTyped } from 'svelte';
import {
  CellComponentProps,
} from '../../types.js'

export default class CellNumberDisplay extends SvelteComponentTyped<CellComponentProps> {}

export type CellNumberDisplayComponent = typeof CellNumberDisplay & SvelteComponentTyped<CellComponentProps>