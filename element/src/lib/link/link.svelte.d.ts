import { SvelteComponentTyped } from 'svelte';
import {
  LinkProps,
} from './types.js'


export default class Link extends SvelteComponentTyped<LinkProps> {}

export type LinkComponent = typeof Link & SvelteComponentTyped<LinkProps>