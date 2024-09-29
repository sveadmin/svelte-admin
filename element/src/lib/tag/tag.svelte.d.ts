import { SvelteComponentTyped } from 'svelte';
import {
  TagProps,
} from './types.js'


export default class Tag extends SvelteComponentTyped<TagProps> {}

export type TagComponent = typeof Tag & SvelteComponentTyped<TagProps>