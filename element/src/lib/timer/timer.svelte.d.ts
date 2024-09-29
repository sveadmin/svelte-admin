import { SvelteComponentTyped } from 'svelte';
import {
  TimerProps,
} from './types.js'


export default class Timer extends SvelteComponentTyped<TimerProps> {}

export type TimerComponent = typeof Timer & SvelteComponentTyped<TimerProps>