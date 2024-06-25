import bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt-adapter';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return await new Promise((resolve) => resolve('hash_value'));
  },

  async compare(): Promise<boolean> {
    return await new Promise((resolve) => resolve(true));
  },
}));

const salt = 12;
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt);
};

describe('Bcrypt Adapter', () => {
  it('Should call hash with correct values', async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.hash('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });

  it('Should return a valid hash on hash success', async () => {
    const sut = makeSut();
    const hash = await sut.hash('any_value');
    expect(hash).toBe('hash_value');
  });

  it('Should throw if bcrypt throws', async () => {
    const sut = makeSut();
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.hash('any_value');
    await expect(promise).rejects.toThrow();
  });

  it('Should call compare with correct values', async () => {
    const sut = makeSut();
    const compareSpy = jest.spyOn(bcrypt, 'compare');
    await sut.compare('any_value', 'any_hash');
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash');
  });

  it('Should return true when success', async () => {
    const sut = makeSut();
    const isValid = await sut.compare('any_value', 'any_hash');
    expect(isValid).toBe(true);
  });

  it('Should return false if comparison fails', async () => {
    const sut = makeSut();
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);
    const comparison = await sut.compare('hash', 'hash');
    expect(comparison).toBe(false);
  });
});
