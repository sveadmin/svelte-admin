import { SvelteComponentTyped } from 'svelte';
import {
  CheckboxSwitchEvents,
  CheckboxSwitchProps,
} from './types.js'

export default class CheckboxSwitch extends SvelteComponentTyped<CheckboxSwitchProps, CheckboxSwitchEvents> {}

export type CheckboxSwitchComponent = typeof CheckboxSwitch & SvelteComponentTyped<CheckboxSwitchProps, CheckboxSwitchEvents>