import { SvelteComponentTyped } from 'svelte';
import { CellDateDisplayProps } from './types.js'

export default class CellDateDisplay extends SvelteComponentTyped<CellDateDisplayProps> {}

export type CellDateDisplayComponent = typeof CellDateDisplay & SvelteComponentTyped<CellDateDisplayProps>