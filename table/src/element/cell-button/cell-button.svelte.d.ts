import { SvelteComponentTyped } from 'svelte';
import {
  CellButtonProps,
} from './types.js'

export default class CellButton extends SvelteComponentTyped<CellButtonProps> {}

export type CellButtonComponent = typeof CellButton & SvelteComponentTyped<CellButtonProps>