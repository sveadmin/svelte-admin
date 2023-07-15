import { SvelteComponentTyped } from 'svelte';
import {
  DateIntervalDisplayEvents,
  DateIntervalDisplayProps,
} from './types.js'


export default class DateIntervalDisplay extends SvelteComponentTyped<DateIntervalDisplayProps, DateIntervalDisplayEvents> {}

export type DateIntervalDisplayComponent = typeof DateIntervalDisplay & SvelteComponentTyped<DateIntervalDisplayProps, DateIntervalDisplayEvents>