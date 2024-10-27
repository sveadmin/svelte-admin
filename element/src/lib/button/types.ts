import type {
  Callback,
  ClassListOptional,
  IconOptional,
  IsDisabledOptional,
  LabelOptional
} from '../types.js'

export const COMPONENT_BUTTON = 'button'

export interface ButtonProps extends
  Callback,
  ClassListOptional,
  IconOptional,
  IsDisabledOptional,
  LabelOptional
{
}
