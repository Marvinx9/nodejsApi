import { MissingParamError } from '../../presentation/errors';
import { Validation } from '../../presentation/protocols/validation';

/* eslint-disable @typescript-eslint/no-explicit-any */
export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName);
    }
  }
}
