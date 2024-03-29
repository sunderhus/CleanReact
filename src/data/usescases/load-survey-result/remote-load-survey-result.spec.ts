import { HttpStatusCode } from '@/data/protocols/http'
import { HttpClientSpy } from '@/data/test'
import { mockRemoteSurveyResultModel } from '@/data/test/mock-remote-survey-result'
import { AccessDeniedError, UnexpectedError } from '@/domain/Errors'
import faker from 'faker'
import { RemoteLoadSurveyResult } from './remote-load-survey-result'

type SutTypes = {
  sut: RemoteLoadSurveyResult
  httpClientSpy: HttpClientSpy<RemoteLoadSurveyResult.Model>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteLoadSurveyResult.Model>()
  const sut = new RemoteLoadSurveyResult(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteLoadSurveyResult', () => {
  it('Should call HttpClient with correct url and method', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    const httpResult = mockRemoteSurveyResultModel()
    httpClientSpy.response.body = httpResult

    await sut.load()

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('GET')
  })

  it('Should return access denied error when HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response.statusCode = HttpStatusCode.forbidden

    const promise = sut.load()

    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  it('Should return unexpected error when HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response.statusCode = HttpStatusCode.notFound

    const promise = sut.load()

    await expect(promise).rejects.toThrowError(new UnexpectedError())
  })

  it('Should return unexpected error when HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response.statusCode = HttpStatusCode.serverError

    const promise = sut.load()

    await expect(promise).rejects.toThrowError(new UnexpectedError())
  })

  it('Should return a survey when HttpClient return 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockRemoteSurveyResultModel()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    const httpResponse = await sut.load()

    expect(httpResponse).toEqual({
      question: httpResult.question,
      answers: httpResult.answers,
      date: new Date(httpResult.date)
    })
  })
})
