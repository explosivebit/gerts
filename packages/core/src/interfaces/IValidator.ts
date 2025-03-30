import { IValidationContext } from './IValidationContext';

/**
 * Interface representing a validator
 */
export interface IValidator {
  /**
   * Generate a validation schema for a given type
   * @param type - The type to generate a schema for
   * @returns The generated schema
   */
  generateSchema(type: unknown): string;

  /**
   * Compile a validation schema for reuse
   * @param schema - The schema to compile
   * @returns A function that validates data against the schema
   */
  compileSchema(schema: string): (data: unknown) => boolean;

  /**
   * Validate data using a validation context
   * @param context - The validation context
   * @returns Whether the validation was successful
   */
  validateWithContext(context: IValidationContext): boolean;
}