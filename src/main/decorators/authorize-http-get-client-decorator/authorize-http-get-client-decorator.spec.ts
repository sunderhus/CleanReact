import { GetStorageSpy, HttpGetClientSpy, mockGetRequest } from '@/data/test'
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'

type SutTypes = {
  sut: AuthorizeHttpGetClientDecorator
  httpGetClientSpy: HttpGetClientSpy<unknown>
}

type SutParams={
  getStorageSpy?: GetStorageSpy
}

const makeSut = ({ getStorageSpy = new GetStorageSpy() }: SutParams): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy()

  const sut = new AuthorizeHttpGetClientDecorator(httpGetClientSpy, getStorageSpy)

  return {
    sut,
    httpGetClientSpy: httpGetClientSpy
  }
}

describe('AuthorizeHttpGetClientDecorator', () => {
  test('Should call GetStorage with correct value', async () => {
    const getStorageSpy = new GetStorageSpy()

    const { sut } = makeSut({ getStorageSpy })
    await sut.get(mockGetRequest())

    expect(getStorageSpy.key).toBe('account')
  })
})
