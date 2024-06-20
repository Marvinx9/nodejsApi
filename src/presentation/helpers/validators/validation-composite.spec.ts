import { MissingParamError } from '../../errors';
import { Validation } from './validation';
import { ValidationComposite } from './validation-composite';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

interface SutTypes {
  sut: ValidationComposite;
  validationStub: Validation;
}

const makeValidation = (): Validation => {
  class validationStub implements Validation {
    validate(input: any): Error {
      return null;
    }
  }
  return new validationStub();
};

const makeSut = (): SutTypes => {
  const validationStub = makeValidation();
  const sut = new ValidationComposite([validationStub]);
  return {
    sut,
    validationStub,
  };
};

describe('Validation Composite', () => {
  it('Should return an error if any validation fails', () => {
    const { sut, validationStub } = makeSut();
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValue(new MissingParamError('field'));
    const error = sut.validate({ field: 'any_value' });
    expect(error).toEqual(new MissingParamError('field'));
  });

  it('Should not return if validation succeeds', () => {
    const { sut } = makeSut();
    const error = sut.validate({ field: 'field' });
    expect(error).toBeFalsy();
  });
});
