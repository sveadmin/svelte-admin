import { SvelteComponentTyped } from 'svelte';
import {
  CellLinkProps,
} from './types.js'


export default class CellLink extends SvelteComponentTyped<CellLinkProps> {}

export type CellLinkComponent = typeof CellLink & SvelteComponentTyped<CellLinkProps>