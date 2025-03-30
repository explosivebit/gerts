import { IError } from './IError';

/**
 * Interface representing validation options
 */
export interface IValidationOptions {
  /** Whether to enable strict mode validation */
  strict?: boolean;
  /** Custom error handler function */
  errorHandler?: (error: IError) => void;
}

/**
 * Interface representing a validation context
 */
export interface IValidationContext {
  /** Current path in the object being validated */
  path: string[];
  /** Current value being validated */
  value: unknown;
  /** Parent value in the validation hierarchy */
  parent?: unknown;
  /** Root value being validated */
  root: unknown;
  /** Validation options */
  options: IValidationOptions;
  /** Array of validation errors */
  errors: IError[];

  /**
   * Add a validation error to the context
   * @param error - The error to add
   */
  addError(error: IError): void;

  /**
   * Create a child validation context
   * @param path - Path segment to append
   * @param value - Value for the child context
   * @returns A new validation context
   */
  createChild(path: string, value: unknown): IValidationContext;
}