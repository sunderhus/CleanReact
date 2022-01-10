import { SetStorageMock } from '@/data/test'
import { InvalidAccessTokenError } from '@/domain/Errors'
import { mockAccountModel } from '@/domain/test'
import faker from 'faker'
import { LocalUpdateCurrentAccount } from './local-update-current-account'

type SutTypes = {
  sut: LocalUpdateCurrentAccount
  setStorageMock: SetStorageMock<string>
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock<string>()
  const sut = new LocalUpdateCurrentAccount(setStorageMock)

  return {
    sut,
    setStorageMock
  }
}

describe('LocalUpdateCurrentAccount', () => {
  test('Should call SetStorage with correct values', async () => {
    const { sut, setStorageMock } = makeSut()
    const account = mockAccountModel()

    await sut.save(account)

    expect(setStorageMock.value).toBe(JSON.stringify(account))
    expect(setStorageMock.key).toBe('account')
  })

  test('Should throw if SetStorage throws', async () => {
    const { sut, setStorageMock } = makeSut()
    jest.spyOn(setStorageMock, 'set').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.save(mockAccountModel())

    await expect(promise).rejects.toThrow(new Error())
  })

  test('Should throw if account is undefined', async () => {
    const { sut } = makeSut()

    const promise = sut.save(undefined)

    await expect(promise).rejects.toThrow(new InvalidAccessTokenError())
  })
})
