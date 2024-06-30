import { Validation } from '../../presentation/protocols/validation';

/* eslint-disable @typescript-eslint/no-explicit-any */
export class ValidationComposite implements Validation {
  constructor(private readonly validations: Validation[]) {}
  validate(input: any): Error {
    for (const validation of this.validations) {
      const error = validation.validate(input);
      if (error) {
        return error;
      }
    }
  }
}
