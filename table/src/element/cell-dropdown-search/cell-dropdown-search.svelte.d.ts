import { SvelteComponentTyped } from 'svelte';
import {
  CellDropdownSearchEvents,
  CellDropdownSearchProps,
} from './types.js'

export default class CellDropdownSearch extends SvelteComponentTyped<CellDropdownSearchProps, CellDropdownSearchEvents> {}

export type CellDropdownSearchComponent = typeof CellDropdownSearch & SvelteComponentTyped<CellDropdownSearchProps, CellDropdownSearchEvents>