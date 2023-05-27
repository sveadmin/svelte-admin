import { SvelteComponentTyped } from 'svelte';
import {
  CellImageProps,
} from './types.js'

export default class CellImage extends SvelteComponentTyped<CellImageProps> {}

export type CellImageComponent = typeof Image & SvelteComponentTyped<CellImageProps>