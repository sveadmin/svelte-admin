import { SvelteComponentTyped } from 'svelte';
import {
  JsonProps,
} from './types.js'


export default class IntervalDisplay extends SvelteComponentTyped<JsonProps> {}

export type IntervalDisplayComponent = typeof IntervalDisplay & SvelteComponentTyped<JsonProps>