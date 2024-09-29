import { SvelteComponentTyped } from 'svelte';
import {
  TranslationInputEvents,
  TranslationInputProps,
} from './types.js'

export default class TranslationInput extends SvelteComponentTyped<TranslationInputProps, TranslationInputEvents> {}

export type TranslationInputComponent = typeof TranslationInput & SvelteComponentTyped<TranslationInputProps, TranslationInputEvents>