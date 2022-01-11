import { InvalidAccessTokenError } from '@/domain/Errors'
import { AccountModel } from '@/domain/models'
import { makeLocalStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory'

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  if (!account?.accessToken) {
    throw new InvalidAccessTokenError()
  }

  makeLocalStorageAdapter().set('account', account)
}

export const getCurrentAccountAdapter = (): AccountModel => {
  return makeLocalStorageAdapter().get('account')
}
