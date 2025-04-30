import type {
  LookupTable,
  LookupTableFunction,
} from '../types.js'

export interface AnyValidator extends CommonValidator {
  data?: ListValidatorData & DateValidatorData & FieldValidatorData;
  value: any;
}

export interface AnyValidatorFunction {
  (): AnyValidator;
}

interface CommonValidator {
  data?: {[key: string]: any};
  skipValidation?: boolean; //Used in nested validator
}

export interface ComparatorData extends ComparisonValidatorData {
  comparator: (a: number, b: number) => boolean;
  errorMessage: string;
}

export interface ComparisonValidatorData extends ValueFallback {
  base?: number | NumberFunction | Date | DateFunction;
}

export interface DatePartValidator {
  day?: number;
  month?: number;
  year?: number;
}

export interface DateValidatorData extends ValueFallback {
  datePartValidator?: DatePartValidator | (() => DatePartValidator);
}

export interface DateValidator extends CommonValidator {
  data?: ComparisonValidatorData & DateValidatorData;
  value: Date;
}

export interface FieldValidatorData extends ValueFallback {
  dataSet?: {[key: string] : any}; 
  fieldName: string;
  ignoreEmpty?: boolean;
  strictComparison?: boolean;
}

export interface IsValid {
  dirty?: boolean;
  message?: string;
  error?: string;
  valid: boolean;
  validatedValue?: any;
}

export interface ListValidatorData extends ValueFallback {
  lookupTable?: LookupTable | LookupTableFunction;
}

export interface NumberValidator extends CommonValidator {
  data?: ComparisonValidatorData & DateValidatorData;
  value: number;
}

export interface StringValidator extends CommonValidator {
  data?: ComparisonValidatorData & DateValidatorData;
  value: string;
}

export interface NumberFunction {
  (): number
}

export interface DateFunction {
  (): Date
}

export interface ValidatorFunction {
  (params?: AnyValidator) : IsValid;
}

export interface Validator {
  validate: (params: AnyValidator) => IsValid;
}

export interface DynamicValidatorFunction {
  (): ValidatorFunction[]
}

export interface ValidatorStore {
  appendValidator: (validator: ValidatorFunction) => void;
  prependValidator: (validator: ValidatorFunction) => void;
  result: IsValid;
  validate: (params?: AnyValidator & StringValidator | undefined) => IsValid;
  validateElement: (event: Event) => IsValid;
}

export interface ValueFallback {
  valueFallback?: any | (() => any);
}