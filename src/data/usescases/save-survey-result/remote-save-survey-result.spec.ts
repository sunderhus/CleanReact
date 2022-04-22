import { HttpStatusCode } from '@/data/protocols/http'
import { HttpClientSpy } from '@/data/test'
import { mockRemoteSurveyResultModel } from '@/data/test/mock-remote-survey-result'
import { AccessDeniedError, UnexpectedError } from '@/domain/Errors'
import { mockSaveSurveyResultParams } from '@/domain/test'
import faker from 'faker'
import { RemoteSaveSurveyResult } from './remote-save-survey-result'

type SutTypes = {
  sut: RemoteSaveSurveyResult
  httpClientSpy: HttpClientSpy<RemoteSaveSurveyResult.Model>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteSaveSurveyResult.Model>()
  const sut = new RemoteSaveSurveyResult(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteSaveSurveyResult', () => {
  it('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteSurveyResultModel()
    }

    const saveSurveyResultParams = mockSaveSurveyResultParams()
    await sut.save(saveSurveyResultParams)

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('PUT')
    expect(httpClientSpy.body).toBe(saveSurveyResultParams)
  })

  it('Should return access denied error when HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response.statusCode = HttpStatusCode.forbidden

    const promise = sut.save(mockSaveSurveyResultParams())

    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  it('Should return unexpected error when HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response.statusCode = HttpStatusCode.notFound

    const promise = sut.save(mockSaveSurveyResultParams())

    await expect(promise).rejects.toThrowError(new UnexpectedError())
  })

  it('Should return unexpected error when HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response.statusCode = HttpStatusCode.serverError

    const promise = sut.save(mockSaveSurveyResultParams())

    await expect(promise).rejects.toThrowError(new UnexpectedError())
  })

  it('Should return a SurveyResult when HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockRemoteSurveyResultModel()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    const httpResponse = await sut.save(mockSaveSurveyResultParams())

    expect(httpResponse).toEqual({
      question: httpResult.question,
      answers: httpResult.answers,
      date: new Date(httpResult.date)
    })
  })
})
