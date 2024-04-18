import {
  Callback,
  ClassListOptional,
  IconOptional,
  IsDisabledOptional,
  LabelOptional
} from '../types.js'

export interface ButtonProps extends
  Callback,
  ClassListOptional,
  IconOptional,
  IsDisabledOptional,
  LabelOptional
{
}

export const COMPONENT_BUTTON = 'button'