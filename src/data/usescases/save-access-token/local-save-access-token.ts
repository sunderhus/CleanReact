import { InvalidAccessTokenError } from '@/domain/Errors'
import { SetStorage } from '@/data/protocols/cache/set-storage'
import { SaveAccessToken } from '@/domain/usecases/save-access-token'

export class LocalSaveAcessToken implements SaveAccessToken {
  constructor (private readonly setStorage: SetStorage<string>) {}

  async save (accessToken: string): Promise<void> {
    if (!accessToken) {
      throw new InvalidAccessTokenError()
    }
    await this.setStorage.set('accessToken', accessToken)
  }
}
