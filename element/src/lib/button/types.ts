import type {
  Callback,
  ClassListOptional,
  IconOptional,
  IsDisabledOptional,
  LabelOptional,
  SizeOptional,
  StyleOptional,
} from '../types.js'

export const COMPONENT_BUTTON = 'button'

export interface ButtonProps extends
  Callback,
  ClassListOptional,
  IconOptional,
  IsDisabledOptional,
  LabelOptional,
  SizeOptional,
  StyleOptional
{
}
