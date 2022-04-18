import { mockAccountModel } from '@/domain/test'
import { HttpRequest } from '@/data/protocols/http'
import { GetStorageSpy, HttpClientSpy, mockHttpRequest } from '@/data/test'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'
import faker from 'faker'

type SutTypes = {
  sut: AuthorizeHttpClientDecorator
  httpClientSpy: HttpClientSpy<unknown>
  getStorageSpy: GetStorageSpy
}

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy()
  const httpClientSpy = new HttpClientSpy()
  const sut = new AuthorizeHttpClientDecorator(httpClientSpy, getStorageSpy)

  return {
    sut,
    httpClientSpy,
    getStorageSpy
  }
}

describe('AuthorizeHttpClientDecorator', () => {
  test('Should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut()
    await sut.request(mockHttpRequest())

    expect(getStorageSpy.key).toBe('account')
  })

  test('Should not add headers if GetStorage is invalid', async () => {
    const { sut, httpClientSpy } = makeSut()
    const HttpRequestMock: HttpRequest = {
      url: faker.internet.url(),
      method: faker.random.arrayElement(['POST', 'GET', 'DELETE', 'PUT'])
    }
    await sut.request(HttpRequestMock)

    expect(httpClientSpy.url).toBe(HttpRequestMock.url)
    expect(httpClientSpy.headers).toEqual(HttpRequestMock.headers)
    expect(httpClientSpy.method).toEqual(HttpRequestMock.method)
  })

  test('Should add headers to HttpGetClient', async () => {
    const { sut, httpClientSpy, getStorageSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const HttpRequestMock: HttpRequest = {
      url: faker.internet.url(),
      method: faker.random.arrayElement(['POST', 'GET', 'DELETE', 'PUT'])
    }

    await sut.request(HttpRequestMock)
    expect(httpClientSpy.url).toBe(HttpRequestMock.url)
    expect(httpClientSpy.headers).toHaveProperty(
      'x-access-token', getStorageSpy.value.accessToken
    )
  })

  test('Should merge headers to HttpGetClient', async () => {
    const { sut, httpClientSpy, getStorageSpy } = makeSut()
    const accountMock = mockAccountModel()
    getStorageSpy.value = accountMock
    const fieldValueMock = faker.random.words()

    const httpRequestMock: HttpRequest = {
      url: faker.internet.url(),
      headers: {
        field: fieldValueMock
      },
      method: faker.random.arrayElement(['POST', 'GET', 'DELETE', 'PUT'])
    }

    await sut.request(httpRequestMock)

    expect(httpClientSpy.url).toBe(httpRequestMock.url)
    expect(httpClientSpy.method).toBe(httpRequestMock.method)
    expect(httpClientSpy.headers).toEqual(
      {
        field: fieldValueMock,
        'x-access-token': accountMock.accessToken
      }
    )
  })

  test('Should return the same result as HttpGetClient', async () => {
    const { sut, httpClientSpy } = makeSut()

    const httpResponse = await sut.request(mockHttpRequest())

    expect(httpResponse).toEqual(httpClientSpy.response)
  })
})
