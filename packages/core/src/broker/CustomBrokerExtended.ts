import { CustomBroker, ICustomBrokerOptions } from './CustomBroker';
import { IValidationOptions } from '../interfaces/IValidationContext';
import { BaseValidationContext } from '../validation/contexts/BaseValidationContext';
import { TypiaValidator } from '../validation/implementations/TypiaValidator';

/**
 * Extended options for the custom broker
 */
export interface ICustomBrokerExtendedOptions extends ICustomBrokerOptions {
  /** Validation options */
  validation?: IValidationOptions & {
    /** Whether to enable validation */
    enabled?: boolean;
  };
}

/**
 * Extended custom broker implementation with validation support
 */
export class CustomBrokerExtended extends CustomBroker {
  /** Validation options */
  protected validationOptions: Required<IValidationOptions & { enabled: boolean }>;
  /** Typia validator instance */
  protected validator: TypiaValidator;

  /**
   * Create a new extended custom broker
   * @param options - Extended broker options
   */
  constructor(options: ICustomBrokerExtendedOptions = {}) {
    super(options);

    this.validationOptions = {
      enabled: options.validation?.enabled ?? false,
      strict: options.validation?.strict ?? true,
      errorHandler: options.validation?.errorHandler
    };

    this.validator = new TypiaValidator();

    if (this.validationOptions.enabled) {
      this.setupValidation();
    }
  }

  /**
   * Set up validation middleware
   */
  protected setupValidation(): void {
    this.use({
      name: () => 'TypiaValidation',
      localAction: async (next, action) => {
        if (action.params) {
          const context = new BaseValidationContext(
            ['params'],
            action.params,
            null,
            action.params,
            this.validationOptions
          );

          const isValid = this.validator.validateWithContext(context);

          if (!isValid && this.validationOptions.strict) {
            throw new Error('Validation failed: ' + JSON.stringify(context.errors));
          }
        }

        return next(action);
      }
    });
  }

  /**
   * Get validation documentation for an action
   * @param action - The action to get documentation for
   * @returns The validation schema as a string
   */
  public getValidationDocs(action: { params: unknown }): string {
    try {
      return this.validator.generateSchema(action.params);
    } catch (error) {
      this.logger.error('Failed to generate validation docs', { error });
      return '';
    }
  }

  /**
   * Create a service with validation
   * @param service - Service definition
   * @returns The created service
   */
  public createService(service: {
    name: string;
    actions: Record<string, { params?: unknown; handler: (ctx: any) => any }>;
  }): any {
    if (this.validationOptions.enabled) {
      // Register validation schemas for each action
      Object.entries(service.actions).forEach(([actionName, action]) => {
        if (action.params) {
          const schema = this.getValidationDocs(action);
          this.logger.debug('Registered validation schema', {
            service: service.name,
            action: actionName,
            schema
          });
        }
      });
    }

    // Implementation for service creation
    return service;
  }
}