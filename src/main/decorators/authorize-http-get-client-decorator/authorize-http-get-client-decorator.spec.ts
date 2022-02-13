import { HttpGetParams } from '@/data/protocols/http'
import { GetStorageSpy, HttpGetClientSpy, mockGetRequest } from '@/data/test'
import { mockAccountModel } from '@/domain/test'
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
    const httpGetParamsMock: HttpGetParams = {
      url: faker.internet.url()
    }
    await sut.get(httpGetParamsMock)

    expect(httpGetClientSpy.url).toBe(httpGetParamsMock.url)
    expect(httpGetClientSpy.headers).toEqual(httpGetParamsMock.headers)
  })

  test('Should add headers to HttpGetClient', async () => {
    const { sut, httpGetClientSpy, getStorageSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const httpGetParamsMock: HttpGetParams = {
      url: faker.internet.url()
    }

    await sut.get(httpGetParamsMock)
    expect(httpGetClientSpy.url).toBe(httpGetParamsMock.url)
    expect(httpGetClientSpy.headers).toHaveProperty(
      'x-access-token', getStorageSpy.value.accessToken
    )
  })

  test('Should merge headers to HttpGetClient', async () => {
    const { sut, httpGetClientSpy, getStorageSpy } = makeSut()
    const accountMock = mockAccountModel()
    getStorageSpy.value = accountMock
    const fieldValueMock = faker.random.words()

    const httpGetParamsMock: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        field: fieldValueMock
      }
    }

    await sut.get(httpGetParamsMock)

    expect(httpGetClientSpy.url).toBe(httpGetParamsMock.url)
    expect(httpGetClientSpy.headers).toEqual(
      {
        field: fieldValueMock,
        'x-access-token': accountMock.accessToken
      }
    )
  })
})
