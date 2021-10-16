import { LocalSaveAcessToken } from './local-save-access-token'
import { SetStorageSpy } from '@/data/test/mock-storage'
import faker from 'faker'

type SutTypes = {
  sut: LocalSaveAcessToken
  setStorageSpy: SetStorageSpy<string>
}

const makeSut = (): SutTypes => {
  const setStorageSpy = new SetStorageSpy<string>()
  const sut = new LocalSaveAcessToken(setStorageSpy)

  return {
    sut,
    setStorageSpy
  }
}

describe('LocalSaveAcessToken', () => {
  test('Should call SetStorage with correct values', async () => {
    const { sut, setStorageSpy } = makeSut()
    const accessToken = faker.datatype.uuid()

    await sut.save(accessToken)

    expect(setStorageSpy.value).toBe(accessToken)
    expect(setStorageSpy.key).toBe('accessToken')
  })
})
