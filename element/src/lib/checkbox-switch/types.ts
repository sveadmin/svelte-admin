import type {
  ClassListOptional,
  DataOptional,
  IdOptional,
  IsDisabledOptional,
  OnChangeOptional,
  OnClickOptional,
  StyleOptional,
  TabIndexOptional,
  Value,
} from '../types.js'

export const COMPONENT_CHECKBOX_SWITCH = 'checkbox-switch'

export interface CheckboxSwitchProps extends
  ClassListOptional,
  DataOptional,
  IdOptional,
  IsDisabledOptional,
  OnChangeOptional,
  OnClickOptional,
  StyleOptional,
  TabIndexOptional,
  Value
{
  areBothValuesVisible: boolean;
  labelClass?: string | string[];
  labels?: {
      false?: string,
      true?: string,
  };
  labelStyle?: string | string[];
  onChange: (event: Event) => void;
  onClick: (event: Event) => void;
}