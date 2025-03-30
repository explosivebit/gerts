import { IValidator } from '../../interfaces/IValidator';
import { IValidationContext } from '../../interfaces/IValidationContext';

/**
 * Base implementation of a validator
 */
export abstract class BaseValidator implements IValidator {
  /**
   * Generate a validation schema for a given type
   * @param type - The type to generate a schema for
   * @returns The generated schema
   */
  public abstract generateSchema(type: unknown): string;

  /**
   * Compile a validation schema for reuse
   * @param schema - The schema to compile
   * @returns A function that validates data against the schema
   */
  public abstract compileSchema(schema: string): (data: unknown) => boolean;

  /**
   * Validate data using a validation context
   * @param context - The validation context
   * @returns Whether the validation was successful
   */
  public abstract validateWithContext(context: IValidationContext): boolean;

  /**
   * Create a validation error
   * @param message - Error message
   * @param code - Error code
   * @param type - Error type
   * @param data - Additional error data
   * @returns The created error object
   */
  protected createError(
    message: string,
    code?: string,
    type?: string,
    data?: unknown
  ): { message: string; code?: string; type?: string; data?: unknown } {
    return {
      message,
      code,
      type,
      data
    };
  }
}