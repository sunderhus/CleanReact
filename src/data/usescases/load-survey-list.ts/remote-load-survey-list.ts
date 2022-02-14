import { UnexpectedError } from '@/domain/Errors/unexpected-error'
import { HttpStatusCode, IHttpGetClient } from '@/data/protocols/http'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor (private readonly url: string, private readonly httpGetClient: IHttpGetClient<RemoteLoadSurveyList.Model[]>) {
  }

  async loadAll (): Promise<LoadSurveyList.Model[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:return httpResponse.body
      case HttpStatusCode.noContent:return []
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveyList{
  export type Model = LoadSurveyList.Model
}
