import { InvalidAccessTokenError } from '@/domain/Errors'
import { mockAccountModel } from '@/domain/test'
import { AccountModel } from '@/domain/models'
import { setCurrentAccountAdapter } from './current-account-adapter'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

jest.mock('@/infra/cache/local-storage-adapter')

type SutTypes = {
  currentAccountAdapterMock(account: AccountModel): void
}

const makeSut = (): SutTypes => {
  const currentAccountAdapterMock = jest.fn(setCurrentAccountAdapter)

  return {
    currentAccountAdapterMock: currentAccountAdapterMock
  }
}

describe('CurrentAccountAdapter', () => {
  it('Should call LocalStorageAdapter with correct values', () => {
    const { currentAccountAdapterMock } = makeSut()
    const account = mockAccountModel()
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')

    currentAccountAdapterMock(account)

    expect(setSpy).toHaveBeenCalledWith('account', account)
  })

  it('Should throw InvalidTokenError', () => {
    const { currentAccountAdapterMock } = makeSut()
    expect(() => {
      currentAccountAdapterMock(undefined)
    }).toThrow(new InvalidAccessTokenError())
  })
})
