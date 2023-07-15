import { SvelteComponentTyped } from 'svelte';

import {
  CellComponentProps,
} from '../../types.js'

import {
  CellCheckboxSwitchEvents,
} from './types.js'

export default class CellCheckboxSwitch extends SvelteComponentTyped<CellComponentProps, CellCheckboxSwitchEvents> {}

export type CellCheckboxSwitchComponent = typeof CellCheckboxSwitch & SvelteComponentTyped<CellComponentProps, CellCheckboxSwitchEvents>