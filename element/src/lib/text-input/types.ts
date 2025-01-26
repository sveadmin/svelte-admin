import type {
  Snippet,
} from 'svelte'

import type {
  TextDisplayMask,
  TextDisplayPartDate,
  TextDisplayPartDateTime,
  TextDisplayPartDay,
  TextDisplayPartDayPeriod,
  TextDisplayPartEra,
  TextDisplayPartFractionalSecond,
  TextDisplayPartHour,
  TextDisplayPartInterval,
  TextDisplayPartLiteral,
  TextDisplayPartMinute,
  TextDisplayPartMonth,
  TextDisplayPartNumber,
  TextDisplayPartSecond,
  TextDisplayPartText,
  TextDisplayPartTime,
  TextDisplayPartTimeZone,
  TextDisplayPartWeek,
  TextDisplayPartWeekday,
  TextDisplayPartYear,
  TextDisplayProps,
} from '$lib/text-display/index.js'

import type {
  ClassListOptional,
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  ElementInstanceOptional,
  IdOptional,
  IsDisabledOptional,
  KeyMap,
  LabelOptional,
  NameOptional,
  StyleOptional,
  ValidatorsOptional,
} from '$lib/types.js'


export const COMPONENT_TEXT_INPUT = 'text-input'

export const INPUT_TYPE_NUMBER = 'number'

export const INPUT_TYPE_PASSWORD = 'password'

export const INPUT_TYPE_TEXT = 'text'

export const INPUT_TYPES = [
  INPUT_TYPE_NUMBER,
  INPUT_TYPE_PASSWORD,
  INPUT_TYPE_TEXT
]

export type InputTypes = typeof INPUT_TYPES[number]

export interface TextInputProps extends
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  ClassListOptional,
  ElementInstanceOptional,
  IdOptional,
  IsDisabledOptional,
  LabelOptional,
  NameOptional,
  StyleOptional,
  TextDisplayProps,
  ValidatorsOptional
{
  areErrorsVisible?: boolean;
  autoFocus?: boolean;
  focused?: boolean;
  keyMap?: KeyMap;
  onBlur?: (event: Event) => void;
  onChange?: (value: any) => void;
  onError?: (error: Error) => void;
  onInit?: (el: HTMLElement) => void;
  onFocus?: (event?: Event) => void;
  onKeyup?: (event: KeyboardEvent) => void;
  type?: InputTypes;
  validateWhenLoaded?: boolean;
  validateWhileTyping?: boolean;
}

export interface TextInputWrappedProps extends TextInputProps {
  input?: Snippet<[TextInputProps]>,
}

export type TextInputMask = TextInputPart[]

export type TextInputPart = TextInputPartObjects | string

export type TextInputPartObjects = TextInputPartDate |
  TextInputPartDateTime |
  TextInputPartDateTimeObjects |
  TextInputPartLiteral |
  TextInputPartNumber |
  TextInputPartText |
  TextInputPartTime

export type TextInputPartDateTimeObjects = TextInputPartDay |
  TextInputPartDayPeriod |
  TextInputPartEra |
  TextInputPartFractionalSecond |
  TextInputPartHour |
  TextInputPartInterval |
  TextInputPartMinute |
  TextInputPartMonth |
  TextInputPartSecond |
  TextInputPartTimeZone |
  TextInputPartWeek |
  TextInputPartWeekday |
  TextInputPartYear

export interface TextInputPartDate extends TextDisplayPartDate {
  editor?: {
  }
}

export interface TextInputPartDateTime extends TextDisplayPartDateTime {
  editor?: {
  }
}

export interface TextInputPartNumber extends TextDisplayPartNumber {
  editor?: {
  }
}

export interface TextInputPartText extends TextDisplayPartText {
  editor?: {
  }
}

export interface TextInputPartTime extends TextDisplayPartTime {
  editor?: {
  }
}

export interface TextInputPartDay extends TextDisplayPartDay {
  editor?: {
  }
}

export interface TextInputPartDayPeriod extends TextDisplayPartDayPeriod {
  editor?: {
  }
}

export interface TextInputPartEra extends TextDisplayPartEra {
  editor?: {
  }
}

export interface TextInputPartFractionalSecond extends TextDisplayPartFractionalSecond {
  editor?: {
  }
}

export interface TextInputPartHour extends TextDisplayPartHour {
  editor?: {
  }
}

export interface TextInputPartInterval extends TextDisplayPartInterval {
  editor?: {
  }
}

export interface TextInputPartLiteral extends TextDisplayPartLiteral {
  editor?: {
    borderless?: boolean;
  }
}

export interface TextInputPartMinute extends TextDisplayPartMinute {
  editor?: {
  }
}

export interface TextInputPartMonth extends TextDisplayPartMonth {
  editor?: {
  }
}

export interface TextInputPartSecond extends TextDisplayPartSecond {
  editor?: {
  }
}

export interface TextInputPartTimeZone extends TextDisplayPartTimeZone {
  editor?: {
  }
}

export interface TextInputPartWeek extends TextDisplayPartWeek {
  editor?: {
  }
}

export interface TextInputPartWeekday extends TextDisplayPartWeekday {
  editor?: {
  }
}

export interface TextInputPartYear extends TextDisplayPartYear {
  editor?: {
  }
}
