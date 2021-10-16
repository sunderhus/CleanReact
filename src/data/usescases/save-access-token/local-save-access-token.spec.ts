import { SetStorageSpy } from '@/data/test/mock-storage'
import { LocalSaveAcessToken } from './local-save-access-token'
import faker from 'faker'

describe('LocalSaveAcessToken', () => {
  test('Should call SetStorage with correct values', async () => {
    const setStorageSpy = new SetStorageSpy<string>()
    const sut = new LocalSaveAcessToken(setStorageSpy)
    const accessToken = faker.datatype.uuid()

    await sut.save(accessToken)

    expect(setStorageSpy.value).toBe(accessToken)
    expect(setStorageSpy.key).toBe('accessToken')
  })
})
