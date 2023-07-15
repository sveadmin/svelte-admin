import { SvelteComponentTyped } from 'svelte';
import {
  ButtonProps,
} from './types.js'

export default class Button extends SvelteComponentTyped<ButtonProps> {}

export type ButtonComponent = typeof Button & SvelteComponentTyped<ButtonProps>