import { InvalidAccessTokenError } from '@/domain/Errors'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from './current-account-adapter'

jest.mock('@/infra/cache/local-storage-adapter')

type SutTypes = {
  setCurrentAccountAdapter(account: AccountModel): void
  getCurrentAccountAdapter(): unknown
}

const makeSut = (): SutTypes => {
  return {
    setCurrentAccountAdapter,
    getCurrentAccountAdapter
  }
}

describe('CurrentAccountAdapter', () => {
  it('Should call LocalStorageAdapter.set with correct values', () => {
    const { setCurrentAccountAdapter } = makeSut()
    const account = mockAccountModel()
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')

    setCurrentAccountAdapter(account)

    expect(setSpy).toHaveBeenCalledWith('account', account)
  })

  it('Should call LocalStorageAdapter.get with correct values', () => {
    const { getCurrentAccountAdapter } = makeSut()
    const account = mockAccountModel()
    const getSpy = jest.spyOn(LocalStorageAdapter.prototype, 'get').mockReturnValueOnce(account)

    const result = getCurrentAccountAdapter()

    expect(getSpy).toHaveBeenCalledWith('account')
    expect(result).toEqual(account)
  })
})
