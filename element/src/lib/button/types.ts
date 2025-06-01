import type {
  Callback,
  ClassListOptional,
  DataOptional,
  IconProperty,
  IsDisabledOptional,
  LabelOptional,
  paddingOverwriteOptional,
  SizeOptional,
  StyleOptional,
  TabIndexOptional,
} from '../types.js'

export const COMPONENT_BUTTON = 'button'

export interface ButtonProps extends
  Callback,
  ClassListOptional,
  DataOptional,
  IsDisabledOptional,
  LabelOptional,
  paddingOverwriteOptional,
  SizeOptional,
  StyleOptional,
  TabIndexOptional
{
  leftIcon?: IconProperty;
  rightIcon?: IconProperty;
}
