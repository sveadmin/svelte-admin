import { SvelteComponentTyped } from 'svelte';
import type {
  DropdownMultiProps,
  DropdownMultiEvents
} from './types.js'

export default class DropdownMulti extends SvelteComponentTyped<DropdownMultiProps, DropdownMultiEvents> {}

export type DropdownMultiComponent = typeof DropdownMulti & SvelteComponentTyped<DropdownMultiProps, DropdownMultiEvents>