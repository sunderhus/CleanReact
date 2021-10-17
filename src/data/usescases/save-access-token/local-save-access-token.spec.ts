import { LocalSaveAcessToken } from './local-save-access-token'
import { SetStorageMock } from '@/data/test'
import faker from 'faker'

type SutTypes = {
  sut: LocalSaveAcessToken
  setStorageMock: SetStorageMock<string>
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock<string>()
  const sut = new LocalSaveAcessToken(setStorageMock)

  return {
    sut,
    setStorageMock
  }
}

describe('LocalSaveAcessToken', () => {
  test('Should call SetStorage with correct values', async () => {
    const { sut, setStorageMock } = makeSut()
    const accessToken = faker.datatype.uuid()

    await sut.save(accessToken)

    expect(setStorageMock.value).toBe(accessToken)
    expect(setStorageMock.key).toBe('accessToken')
  })

  test('Should throw if SetStorage throws', async () => {
    const { sut, setStorageMock } = makeSut()
    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error())
    const promise = sut.save(faker.datatype.uuid())

    await expect(promise).rejects.toThrow(new Error())
  })
})
