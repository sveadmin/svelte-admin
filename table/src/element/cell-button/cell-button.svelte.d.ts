import { SvelteComponentTyped } from 'svelte';
import {
  CellComponentProps,
} from '../../types.js'

export default class CellButton extends SvelteComponentTyped<CellComponentProps> {}

export type CellButtonComponent = typeof CellButton & SvelteComponentTyped<CellComponentProps>