import { SvelteComponentTyped } from 'svelte';
import {
  CellComponentProps,
} from '../../types.js'


export default class CellLink extends SvelteComponentTyped<CellComponentProps> {}

export type CellLinkComponent = typeof CellLink & SvelteComponentTyped<CellComponentProps>