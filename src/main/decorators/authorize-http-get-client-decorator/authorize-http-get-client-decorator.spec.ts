import { HttpGetParams } from '@/data/protocols/http'
import { GetStorageSpy, HttpGetClientSpy, mockGetRequest } from '@/data/test'
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'
import faker from 'faker'

type SutTypes = {
  sut: AuthorizeHttpGetClientDecorator
  httpGetClientSpy: HttpGetClientSpy<unknown>
  getStorageSpy: GetStorageSpy
}

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy()
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new AuthorizeHttpGetClientDecorator(httpGetClientSpy, getStorageSpy)

  return {
    sut,
    httpGetClientSpy,
    getStorageSpy
  }
}

describe('AuthorizeHttpGetClientDecorator', () => {
  test('Should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut()
    await sut.get(mockGetRequest())

    expect(getStorageSpy.key).toBe('account')
  })

  test('Should not add headers if GetStorage is invalid', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpRequestMock: HttpGetParams = {
      url: faker.internet.url()
    }
    await sut.get(httpRequestMock)

    expect(httpGetClientSpy.url).toBe(httpRequestMock.url)
    expect(httpGetClientSpy.headers).toEqual(httpRequestMock.headers)
  })
})
