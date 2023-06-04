import { SvelteComponentTyped } from 'svelte';
import {
  CellComponentProps,
} from '../../types.js'

export default class CellImage extends SvelteComponentTyped<CellComponentProps> {}

export type CellImageComponent = typeof Image & SvelteComponentTyped<CellComponentProps>