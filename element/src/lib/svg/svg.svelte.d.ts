import { SvelteComponentTyped } from 'svelte';
import {
  SvgProps,
} from './types.js'

export default class Svg extends SvelteComponentTyped<SvgProps> {}

export type SvgComponent = typeof Svg & SvelteComponentTyped<SvgProps>