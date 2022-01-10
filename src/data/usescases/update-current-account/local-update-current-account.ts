import { AccountModel } from '@/domain/models'
import { InvalidAccessTokenError } from '@/domain/Errors'
import { SetStorage } from '@/data/protocols/cache/set-storage'
import { UpdateCurrentAccount } from '@/domain/usecases/update-current-account'

export class LocalUpdateCurrentAccount implements UpdateCurrentAccount {
  constructor (private readonly setStorage: SetStorage<string>) {}

  async save (account: AccountModel): Promise<void> {
    if (!account?.accessToken) {
      throw new InvalidAccessTokenError()
    }
    await this.setStorage.set('account', JSON.stringify(account))
  }
}
