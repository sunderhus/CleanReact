import { mockHttpResponse } from '@/infra/test/mock-axios'
import { mockHttpRequest } from '@/data/test'
import { mockAxios } from '@/infra/test'
import { AxiosStatic } from 'axios'
import { AxiosHttpClient } from './axios-http-client'

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<AxiosStatic>
}

jest.mock('axios')

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return { sut, mockedAxios }
}

describe('AxiosHttpClient', () => {
  describe('Request', () => {
    test('Should call axios request with correct values', async () => {
      const request = mockHttpRequest()
      const { sut, mockedAxios } = makeSut()
      await sut.request(request)
      expect(mockedAxios.request).toHaveBeenCalledWith({
        url: request.url,
        method: request.method,
        data: request.body,
        headers: request.headers
      })
    })

    test('Should return the correct response on axios request', async () => {
      const { sut, mockedAxios } = makeSut()
      const httpResponse = await sut.request(mockHttpRequest())
      const axiosResponse = await mockedAxios.request.mock.results[0].value
      expect(httpResponse).toEqual({
        body: axiosResponse.data,
        statusCode: axiosResponse.status
      })
    })

    test('Should return the correct response when axios request fail', () => {
      const { sut, mockedAxios } = makeSut()
      mockedAxios.request.mockRejectedValueOnce({
        response: mockHttpResponse()
      })
      const promise = sut.request(mockHttpRequest())
      expect(promise).toEqual(mockedAxios.request.mock.results[0].value)
    })
  })
})
