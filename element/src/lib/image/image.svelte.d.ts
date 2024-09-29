import { SvelteComponentTyped } from 'svelte';
import {
  ImageProps,
} from './types.js'

export default class Image extends SvelteComponentTyped<ImageProps> {}

export type ImageComponent = typeof Image & SvelteComponentTyped<ImageProps>