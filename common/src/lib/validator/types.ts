export interface IsValid {
  dirty?: boolean;
  message?: string;
  error?: string;
  valid: boolean;
}

export interface AnyValidator extends CommonValidator {
  value: any;
}

export interface AnyValidatorFunction {
  (): AnyValidator;
}

interface CommonValidator {
  data?: {[key: string]: any};
  skipValidation?: boolean; //Used in nested validator
}

export interface DateValidator extends CommonValidator {
  value: Date;
}

export interface NumberValidator extends CommonValidator {
  value: number;
}

export interface StringValidator extends CommonValidator {
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