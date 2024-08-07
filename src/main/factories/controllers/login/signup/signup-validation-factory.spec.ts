import {
  CompareFieldsValidation,
  RequiredFieldValidation,
  ValidationComposite,
  EmailValidation,
} from '../../../../../validation/validators';
import { Validation } from '../../../../../presentation/protocols/validation';
import { EmailValidator } from '../../../../../validation/protocols/email-validator';
import { makeSignupValidation } from './signup-validation-factory';
/* eslint-disable @typescript-eslint/no-unused-vars */
jest.mock('../../../../../validation/validators/validation-composite');

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

describe('SignUpValidation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeSignupValidation();
    const validations: Validation[] = [];
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(
      new CompareFieldsValidation('password', 'passwordConfirmation'),
    );
    validations.push(new EmailValidation('email', makeEmailValidator()));

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
