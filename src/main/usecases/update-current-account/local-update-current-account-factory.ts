import { LocalUpdateCurrentAccount } from '@/data/usescases/update-current-account/local-update-current-account'
import { UpdateCurrentAccount } from '@/domain/usecases'
import { makeLocalStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory'

export const makeLocalUpdateCurrentAccount = (): UpdateCurrentAccount => {
  return new LocalUpdateCurrentAccount(makeLocalStorageAdapter())
}
