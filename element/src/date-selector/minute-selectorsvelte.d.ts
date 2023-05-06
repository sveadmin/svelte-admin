import { SvelteComponentTyped } from 'svelte';
import {
  MinuteSelectorEvents,
  MinuteSelectorProps,
} from './types.js'

export default class MinuteSelector extends SvelteComponentTyped<MinuteSelectorProps> {}

export type MinuteSelectorComponent = typeof MinuteSelector & SvelteComponentTyped<MinuteSelectorProps, MinuteSelectorEvents>