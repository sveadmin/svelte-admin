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
  labels?: {
      false?: string,
      true?: string,
  };
}

export const COMPONENT_CHECKBOX_SWITCH = 'checkbox-switch'