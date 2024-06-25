import {
  AddAccount,
  AddAccountModel,
  Hasher,
  AccountModel,
  AddAccountRepository,
} from './db-add-account-protocols';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
  ) {}
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const hashed_password = await this.hasher.hash(accountData.password);
    const account = await this.addAccountRepository.add(
      Object.assign({}, accountData, { password: hashed_password }),
    );
    return account;
  }
}
