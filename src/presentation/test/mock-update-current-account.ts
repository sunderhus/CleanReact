import { AccountModel } from '@/domain/models'
import { UpdateCurrentAccount } from '@/domain/usecases/update-current-account'

export class UpdateCurrentAccountMock implements UpdateCurrentAccount {
  account: AccountModel;
  async save (account: AccountModel): Promise<void> {
    this.account = account
    await Promise.resolve()
  }
}
