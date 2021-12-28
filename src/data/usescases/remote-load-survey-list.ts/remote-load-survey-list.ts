import { IHttpGetClient } from '@/data/protocols/http'
import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor (private readonly url: string, private readonly httpGetClient: IHttpGetClient<SurveyModel[]>) {
  }

  async loadAll (): Promise<SurveyModel[]> {
    await this.httpGetClient.get({ url: this.url })
    return Promise.resolve(null)
  }
}
