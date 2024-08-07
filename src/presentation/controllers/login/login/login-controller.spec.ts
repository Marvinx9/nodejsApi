import {
  Authentication,
  AuthenticationParams,
  HttpRequest,
  Validation,
} from './login-controller-protocols';
import { MissingParamError } from '../../../errors';
import { LoginController } from './login-controller';
import { AuthenticationModel } from '../../../../domain/models/authentication';
import {
  badRequest,
  serverError,
  unauthorized,
  ok,
} from '../../../helpers/http/http-helper';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth(
      authentication: AuthenticationParams,
    ): Promise<AuthenticationModel> {
      return new Promise((resolve) =>
        resolve({ accessToken: 'any_token', name: 'any_name' }),
      );
    }
  }
  return new AuthenticationStub();
};

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error | null {
      return null;
    }
  }
  return new ValidationStub();
};
type TypeSut = {
  sut: LoginController;
  authenticationStub: Authentication;
  validationStub: Validation;
};

const makeSut = (): TypeSut => {
  const authenticationStub = makeAuthentication();
  const validationStub = makeValidation();
  const sut = new LoginController(validationStub, authenticationStub);
  return { sut, authenticationStub, validationStub };
};

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@email.com',
    password: 'any_password',
  },
});

describe('Login Controller', () => {
  it('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut();
    const authSpy = jest.spyOn(authenticationStub, 'auth');
    await sut.handle(makeFakeRequest());
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email@email.com',
      password: 'any_password',
    });
  });

  it('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut();
    jest
      .spyOn(authenticationStub, 'auth')
      .mockReturnValueOnce(new Promise((resolve) => resolve(null)));
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(unauthorized());
  });

  it('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut();
    jest
      .spyOn(authenticationStub, 'auth')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('Should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(
      ok({ accessToken: 'any_token', name: 'any_name' }),
    );
  });

  it('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  it('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut();
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_Error'));
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('any_Error')),
    );
  });
});
