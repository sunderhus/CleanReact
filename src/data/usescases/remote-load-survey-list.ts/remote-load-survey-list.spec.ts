import { RemoteLoadSurveyList } from './remote-load-survey-list'
import { HttpGetClientMock } from '@/data/test'
import { SurveyModel } from '@/domain/models'
import faker from 'faker'

type SutParams = {
  url: string
}

type SutTypes = {
  sut: RemoteLoadSurveyList
  httpGetClientMock: HttpGetClientMock<SurveyModel[]>
}

const makeSut = ({ url }: SutParams): SutTypes => {
  const httpGetClientMock = new HttpGetClientMock<SurveyModel[]>()
  const sut = new RemoteLoadSurveyList(url, httpGetClientMock)
  return {
    sut,
    httpGetClientMock
  }
}

describe('RemoteLoadSurveyList', () => {
  it('Should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpGetClientMock } = makeSut({ url })

    await sut.loadAll()

    expect(httpGetClientMock.url).toBe(url)
  })
})
