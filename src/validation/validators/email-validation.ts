import { InvalidParamError } from '../../presentation/errors';
import { EmailValidator } from '../protocols/email-validator';
import { Validation } from '../../presentation/protocols/validation';

/* eslint-disable @typescript-eslint/no-explicit-any */
export class EmailValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator,
  ) {}

  validate(input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldName]);
    if (!isValid) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
