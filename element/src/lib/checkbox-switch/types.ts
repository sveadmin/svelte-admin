import type {
  ClassListOptional,
  DataOptional,
  IdOptional,
  IsDisabledOptional,
  OnChangeOptional,
  OnClickOptional,
  SizeOptional,
  StyleOptional,
  TabIndexOptional,
  ValueOptional,
} from '../types.js'

export const COMPONENT_CHECKBOX_SWITCH = 'checkbox-switch'

export interface CheckboxSwitchProps extends
  ClassListOptional,
  DataOptional,
  IdOptional,
  IsDisabledOptional,
  OnChangeOptional,
  OnClickOptional,
  SizeOptional,
  StyleOptional,
  TabIndexOptional,
  ValueOptional
{
  areBothValuesVisible?: boolean;
  labelClass?: string | string[];
  labels?: {
      false?: string,
      true?: string,
  };
  labelStyle?: string | string[];
}