import { HttpGetClientSpy } from '@/data/test'
import faker from 'faker'
import { RemoteLoadSurveyResult } from './remote-load-survey-result'

type SutTypes = {
  sut: RemoteLoadSurveyResult
  httpClientSpy: HttpGetClientSpy<unknown>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpGetClientSpy()
  const sut = new RemoteLoadSurveyResult(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteLoadSurveyResult', () => {
  test('Should call HttpGetClient with correct url', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.load()

    expect(httpClientSpy.url).toBe(url)
  })
})
