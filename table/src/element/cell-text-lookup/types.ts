import {
  AllowedDisplayMode,
  Option,
} from '@sveadmin/element'

export interface CellTextLookupProps {
  displayMode?: AllowedDisplayMode;
  getValue?: (() => string);
  getValues?: (() => Option[]);
  highlightMissingValue?: boolean;
  value?: string;
  values?: Option[];
}

export const COMPONENT_TEXT_LOOKUP = 'text-lookup'