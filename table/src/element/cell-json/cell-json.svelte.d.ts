import { SvelteComponentTyped } from 'svelte';

import {
  CellComponentProps,
} from '../../types.js'


export default class CellJson extends SvelteComponentTyped<CellComponentProps> {}

export type CellJsonComponent = typeof CellJson & SvelteComponentTyped<CellComponentProps>