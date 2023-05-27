import { SvelteComponentTyped } from 'svelte';
import {
  JsonProps,
} from './types.js'


export default class Json extends SvelteComponentTyped<JsonProps> {}

export type JsonComponent = typeof Json & SvelteComponentTyped<JsonProps>