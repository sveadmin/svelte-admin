import { SvelteComponentTyped } from 'svelte';
import {
  CellComponentProps,
} from '../../types.js'

export default class CellTextLookup extends SvelteComponentTyped<CellComponentProps> {}

export type CellTextLookupComponent = typeof CellTextLookup & SvelteComponentTyped<CellComponentProps>