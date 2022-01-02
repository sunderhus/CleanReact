import { UnexpectedError } from '@/domain/Errors/unexpected-error'
import { HttpStatusCode, IHttpGetClient } from '@/data/protocols/http'
import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor (private readonly url: string, private readonly httpGetClient: IHttpGetClient<SurveyModel[]>) {
  }

  async loadAll (): Promise<SurveyModel[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:return httpResponse.body
      default: throw new UnexpectedError()
    }
  }
}
