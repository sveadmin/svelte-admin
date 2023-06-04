import {
  IsValid,
} from '@sveadmin/common'

export interface CellDropdownSearchEvents {
  error: CustomEvent<{
    id: string;
    isValid: IsValid;
  }>;
  valueChanged: CustomEvent<string | null>;
  keyup: CustomEvent<KeyboardEvent>
}