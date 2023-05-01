import { SvelteComponentTyped } from 'svelte';
import {
  NumberDisplayEvents,
  NumberDisplayProps,
} from './types.js'

export default class NumberDisplay extends SvelteComponentTyped<NumberDisplayProps, NumberDisplayEvents> {}

export type NumberDisplayComponent = typeof NumberDisplay & SvelteComponentTyped<NumberDisplayProps, NumberDisplayEvents>