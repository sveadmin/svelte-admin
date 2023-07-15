import { SvelteComponentTyped } from 'svelte';
import {
  CurrencyInputProps,
} from './types.js'

export default class CurrencyInput extends SvelteComponentTyped<CurrencyInputProps> {}

export type CurrencyInputComponent = typeof CurrencyInput & SvelteComponentTyped<CurrencyInputProps>