import { SvelteComponentTyped } from 'svelte';
import {
  PasswordInputEvents,
  PasswordInputProps,
} from './types.js'

export default class TextInput extends SvelteComponentTyped<PasswordInputProps, PasswordInputEvents> {}

export type TextInputComponent = typeof TextInput & SvelteComponentTyped<PasswordInputProps, PasswordInputEvents>