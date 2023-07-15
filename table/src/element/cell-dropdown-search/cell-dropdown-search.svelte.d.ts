import { SvelteComponentTyped } from 'svelte';

import {
  CellComponentProps,
} from '../../types.js'

import {
  CellDropdownSearchEvents,
} from './types.js'

export default class CellDropdownSearch extends SvelteComponentTyped<CellComponentProps, CellDropdownSearchEvents> {}

export type CellDropdownSearchComponent = typeof CellDropdownSearch & SvelteComponentTyped<CellComponentProps, CellDropdownSearchEvents>