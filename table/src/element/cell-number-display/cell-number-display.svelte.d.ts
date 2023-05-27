import { SvelteComponentTyped } from 'svelte';
import {
  CellNumberDisplayProps,
} from './types.js'

export default class CellNumberDisplay extends SvelteComponentTyped<CellNumberDisplayProps> {}

export type CellNumberDisplayComponent = typeof CellNumberDisplay & SvelteComponentTyped<CellNumberDisplayProps>