import { RemoteLoadSurveyList } from './remote-load-survey-list'
import { HttpGetClientMock } from '@/data/test'
import { SurveyModel } from '@/domain/models'
import faker from 'faker'

describe('RemoteLoadSurveyList', () => {
  it('Should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const httpGetClientMock = new HttpGetClientMock<SurveyModel[]>()
    const sut = new RemoteLoadSurveyList(url, httpGetClientMock)
    await sut.loadAll()
    expect(httpGetClientMock.url).toBe(url)
  })
})
