import { SvelteComponentTyped } from 'svelte';
import {
  IntervalDisplayEvents,
  IntervalDisplayProps,
} from './types.js'


export default class IntervalDisplay extends SvelteComponentTyped<IntervalDisplayProps, IntervalDisplayEvents> {}

export type IntervalDisplayComponent = typeof IntervalDisplay & SvelteComponentTyped<IntervalDisplayProps, IntervalDisplayEvents>