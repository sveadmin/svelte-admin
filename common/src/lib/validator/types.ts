export interface IsValid {
  dirty?: boolean;
  message?: string | null;
  error?: string | null;
  valid: boolean;
}

export interface AnyValidator {
  data?: {[key: string]: any},
  value: any;
}

export interface DateValidator {
  data?: {[key: string]: any},
  value: Date | string;
}

export interface NumberValidator {
  data?: {[key: string]: any},
  value: number | string;
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

export type ValidatorFunctionParameter = AnyValidator | NumberValidator | DateValidator | StringValidator

export interface ValidatorFunction {
  (params: ValidatorFunctionParameter) : IsValid; 
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