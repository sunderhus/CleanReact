import 'jest-localstorage-mock'
import faker from 'faker'
import { AccountModel } from '@/domain/models/account-model'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

const makeSut = (): LocalStorageAdapter => {
  const sut = new LocalStorageAdapter()

  return sut
}

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should call LocalStorage with correct values', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.random.objectElement<AccountModel>()

    sut.set(key, value)

    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  })
})
