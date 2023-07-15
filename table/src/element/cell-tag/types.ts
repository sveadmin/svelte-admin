import { SvelteComponent } from 'svelte'

import {
  TagType
} from '@sveadmin/element'

export interface CellTagProps {
  component?: typeof SvelteComponent;
  componentAttributes?: {[key: string] : any};
  getTagType?: {({}) : TagType};
  getValue?: {({}) : string};
  items: {}[],
  tagType?: TagType;
}