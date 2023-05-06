import { SvelteComponentTyped } from 'svelte';
import {
  LocaleSelectorEvents,
  LocaleSelectorProps,
} from './types.js'

export default class LocaleSelector extends SvelteComponentTyped<LocaleSelectorProps, LocaleSelectorEvents> {}

export type LocaleSelectorComponent = typeof LocaleSelector & SvelteComponentTyped<LocaleSelectorProps, LocaleSelectorEvents>