import { SvelteComponentTyped } from 'svelte';
import {
  TextInputEvents,
  TextInputProps,
} from './types.js'

export default class TextInput extends SvelteComponentTyped<TextInputProps, TextInputEvents> {}

export type TextInputComponent = typeof TextInput & SvelteComponentTyped<TextInputProps, TextInputEvents>