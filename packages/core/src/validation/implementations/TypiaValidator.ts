import * as typia from 'typia';
import { BaseValidator } from './BaseValidator';
import { IValidationContext } from '../../interfaces/IValidationContext';

/**
 * Validator implementation using Typia
 */
export class TypiaValidator extends BaseValidator {
  /**
   * Generate a validation schema for a given type
   * @param type - The type to generate a schema for
   * @returns The generated schema
   */
  public generateSchema(type: unknown): string {
    try {
      return JSON.stringify(typia.json.validate(type));
    } catch (error) {
      throw this.createError(
        'Failed to generate schema',
        'SCHEMA_GENERATION_ERROR',
        'ValidationError',
        error
      );
    }
  }

  /**
   * Compile a validation schema for reuse
   * @param schema - The schema to compile
   * @returns A function that validates data against the schema
   */
  public compileSchema(schema: string): (data: unknown) => boolean {
    try {
      const parsedSchema = JSON.parse(schema);
      return (data: unknown): boolean => {
        try {
          return typia.validate(data, parsedSchema);
        } catch {
          return false;
        }
      };
    } catch (error) {
      throw this.createError(
        'Failed to compile schema',
        'SCHEMA_COMPILATION_ERROR',
        'ValidationError',
        error
      );
    }
  }

  /**
   * Validate data using a validation context
   * @param context - The validation context
   * @returns Whether the validation was successful
   */
  public validateWithContext(context: IValidationContext): boolean {
    try {
      const result = typia.validate(context.value);
      if (!result) {
        context.addError(
          this.createError(
            'Validation failed',
            'VALIDATION_ERROR',
            'ValidationError',
            { value: context.value }
          )
        );
      }
      return result;
    } catch (error) {
      context.addError(
        this.createError(
          'Validation failed',
          'VALIDATION_ERROR',
          'ValidationError',
          error
        )
      );
      return false;
    }
  }
}