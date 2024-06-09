import { EmailValidatorAdapter } from './email-validator';

describe('EmailValidator Adapter', () => {
  it('should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter();
    const isValid = sut.isValid('invalid_email@email.com');
    expect(isValid).toBe(true);
  });
});