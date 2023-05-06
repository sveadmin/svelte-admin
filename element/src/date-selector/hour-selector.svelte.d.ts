import { SvelteComponentTyped } from 'svelte';
import {
  HourSelectorProps,
} from './types.js'

export default class HourSelector extends SvelteComponentTyped<HourSelectorProps> {}

export type HourSelectorComponent = typeof HourSelector & SvelteComponentTyped<HourSelectorProps>