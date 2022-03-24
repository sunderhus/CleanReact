import { HttpGetClientSpy } from '@/data/test'
import faker from 'faker'
import { RemoteLoadSurveyResult } from './remote-load-survey-result'

describe('RemoteLoadSurveyResult', () => {
  test('Should call HttpGetClient with correct url', async () => {
    const url = faker.internet.url()
    const httpClientSpy = new HttpGetClientSpy()
    const sut = new RemoteLoadSurveyResult(url, httpClientSpy)
    await sut.load()

    expect(httpClientSpy.url).toBe(url)
  })
})
