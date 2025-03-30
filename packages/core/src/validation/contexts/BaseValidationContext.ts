import { IError } from '../../interfaces/IError';
import { IValidationContext, IValidationOptions } from '../../interfaces/IValidationContext';

/**
 * Base implementation of a validation context
 */
export class BaseValidationContext implements IValidationContext {
  /** Current path in the object being validated */
  public readonly path: string[];
  /** Current value being validated */
  public readonly value: unknown;
  /** Parent value in the validation hierarchy */
  public readonly parent?: unknown;
  /** Root value being validated */
  public readonly root: unknown;
  /** Validation options */
  public readonly options: IValidationOptions;
  /** Array of validation errors */
  public readonly errors: IError[];

  /**
   * Create a new validation context
   * @param path - Current path in the object being validated
   * @param value - Current value being validated
   * @param parent - Parent value in the validation hierarchy
   * @param root - Root value being validated
   * @param options - Validation options
   */
  constructor(
    path: string[],
    value: unknown,
    parent: unknown,
    root: unknown,
    options: IValidationOptions
  ) {
    this.path = path;
    this.value = value;
    this.parent = parent;
    this.root = root;
    this.options = options;
    this.errors = [];
  }

  /**
   * Add a validation error to the context
   * @param error - The error to add
   */
  public addError(error: IError): void {
    const fullError = {
      ...error,
      path: this.path.join('.')
    };

    this.errors.push(fullError);

    if (this.options.errorHandler) {
      this.options.errorHandler(fullError);
    }
  }

  /**
   * Create a child validation context
   * @param path - Path segment to append
   * @param value - Value for the child context
   * @returns A new validation context
   */
  public createChild(path: string, value: unknown): IValidationContext {
    return new BaseValidationContext(
      [...this.path, path],
      value,
      this.value,
      this.root,
      this.options
    );
  }
}