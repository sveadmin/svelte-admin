export interface IsValid {
  dirty?: boolean;
  message?: string;
  error?: string;
  valid: boolean;
}

export interface AnyValidator {
  data?: {[key: string]: any},
  value: any;
}

export interface DateValidator {
  data?: {[key: string]: any},
  value: Date;
}

export interface NumberValidator {
  data?: {[key: string]: any},
  value: number;
}

export interface StringValidator {
  data?: {[key: string]: any},
  value: string;
}

export interface NumberFunction {
  (): number
}

export interface DateFunction {
  (): Date
}

export interface ValidatorFunction {
  (params: AnyValidator) : IsValid;
}

export interface DynamicValidatorFunction {
  (): ValidatorFunction[]
}

export interface ValidatorStore {
  appendValidator: (validator: ValidatorFunction) => void;
  prependValidator: (validator: ValidatorFunction) => void;
  result: IsValid;
  validate: (value: any, dirty?: boolean, ...params: any[]) => IsValid;
  validateElement: (event: Event) => IsValid;
}