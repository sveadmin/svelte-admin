import type {
  Callback,
  ClassListOptional,
  DataOptional,
  IconOptional,
  IsDisabledOptional,
  LabelOptional,
  SizeOptional,
  StyleOptional,
  TabIndexOptional,
} from '../types.js'

export const COMPONENT_BUTTON = 'button'

export interface ButtonProps extends
  Callback,
  ClassListOptional,
  DataOptional,
  IconOptional,
  IsDisabledOptional,
  LabelOptional,
  SizeOptional,
  StyleOptional,
  TabIndexOptional
{
}
