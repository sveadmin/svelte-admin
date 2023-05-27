import { SvelteComponentTyped } from 'svelte';
import {
  CellCheckboxSwitchEvents,
  CellCheckboxSwitchProps,
} from './types.js'

export default class CellCheckboxSwitch extends SvelteComponentTyped<CellCheckboxSwitchProps, CellCheckboxSwitchEvents> {}

export type CellCheckboxSwitchComponent = typeof CellCheckboxSwitch & SvelteComponentTyped<CellCheckboxSwitchProps, CellCheckboxSwitchEvents>