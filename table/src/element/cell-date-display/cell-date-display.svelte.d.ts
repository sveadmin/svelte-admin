import { SvelteComponentTyped } from 'svelte'

import {
  CellComponentProps,
} from '../../types.js'

export default class CellDateDisplay extends SvelteComponentTyped<CellComponentProps> {}

export type CellDateDisplayComponent = typeof CellDateDisplay & SvelteComponentTyped<CellComponentProps>