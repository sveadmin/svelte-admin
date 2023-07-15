import { SvelteComponentTyped } from 'svelte';
import {
  TextDisplayProps,
} from './types.js'

export default class TextDisplay extends SvelteComponentTyped<TextDisplayProps> {}

export type TextDisplayComponent = typeof TextDisplay & SvelteComponentTyped<TextDisplayProps>