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