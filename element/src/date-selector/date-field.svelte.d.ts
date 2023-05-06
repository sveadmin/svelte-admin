import { SvelteComponentTyped } from 'svelte';
import {
  DateFieldProps,
} from './types.js'

export default class DateField extends SvelteComponentTyped<DateFieldProps> {}

export type DateFieldComponent = typeof DateField & SvelteComponentTyped<DateFieldProps>