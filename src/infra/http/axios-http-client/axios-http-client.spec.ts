import { HttpPostParams } from './../../../data/protocols/http/http-post-client'
import { AxiosHttpClient } from './axios-http-client'
import axios from 'axios'
import faker from 'faker'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}
const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()

})

describe('AxiosHttpClient', () => {
  test('Should call axios with correct URL and verb', async () => {
    const payloadRequest = mockPostRequest()
    const sut = makeSut()
    await sut.post(payloadRequest)
    expect(mockedAxios.post).toHaveBeenCalledWith(payloadRequest.url)
  })
})
