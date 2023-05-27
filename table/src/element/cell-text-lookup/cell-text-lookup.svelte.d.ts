import { SvelteComponentTyped } from 'svelte';
import {
  CellTextLookupProps,
} from './types.js'

export default class CellTextLookup extends SvelteComponentTyped<CellTextLookupProps> {}

export type CellTextLookupComponent = typeof CellTextLookup & SvelteComponentTyped<CellTextLookupProps>