import { SvelteComponentTyped } from 'svelte';
import {
  NumberInputEvents,
  NumberInputProps,
} from './types.js'

export default class NumberInput extends SvelteComponentTyped<NumberInputProps, NumberInputEvents> {}

export type NumberInputComponent = typeof NumberInput & SvelteComponentTyped<NumberInputProps, NumberInputEvents>