import { SvelteComponentTyped } from 'svelte';
import { DateDisplayProps } from './types.js'

export default class DateDisplay extends SvelteComponentTyped<DateDisplayProps> {}

export type DateDisplayComponent = typeof DateDisplay & SvelteComponentTyped<DateDisplayProps>