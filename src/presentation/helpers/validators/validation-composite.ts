import { Validation } from '../../protocols/validation';

/* eslint-disable @typescript-eslint/no-explicit-any */
export class ValidationComposite implements Validation {
  private readonly validations: Validation[];

  constructor(validations: Validation[]) {
    this.validations = validations;
  }
  validate(input: any): Error {
    for (const validation of this.validations) {
      const error = validation.validate(input);
      if (error) {
        return error;
      }
    }
  }
}
