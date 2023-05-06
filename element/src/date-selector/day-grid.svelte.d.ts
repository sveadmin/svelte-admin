import { SvelteComponentTyped } from 'svelte';
import {
  DayGridEvents,
  DayGridProps,
} from './types.js'

export default class DayGrid extends SvelteComponentTyped<DayGridProps, DayGridEvents> {}

export type DayGridComponent = typeof DayGrid & SvelteComponentTyped<DayGridProps, DayGridEvents>