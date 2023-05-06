import { SvelteComponentTyped } from 'svelte';
import {
  DateSelectorProps,
} from './types.js'

export default class DateSelector extends SvelteComponentTyped<DateSelectorProps> {}

export type DateSelectorComponent = typeof DateSelector & SvelteComponentTyped<DateSelectorProps>