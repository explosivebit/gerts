/**
 * Interface representing an error in the system
 */
export interface IError {
  /** The error message */
  message: string;
  /** The error code */
  code?: string;
  /** The error type */
  type?: string;
  /** The error data */
  data?: unknown;
  /** Stack trace */
  stack?: string;
}