import { SvelteComponentTyped } from 'svelte';
import {
  DropdownSearchEvents,
  DropdownSearchProps,
} from './types.js'

export default class DropdownSearch extends SvelteComponentTyped<DropdownSearchProps, DropdownSearchEvents> {}

export type DropdownSearchComponent = typeof DropdownSearch & SvelteComponentTyped<DropdownSearchProps, DropdownSearchEvents>