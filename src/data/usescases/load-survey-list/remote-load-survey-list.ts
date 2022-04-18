
import { HttpStatusCode, IHttpClient } from '@/data/protocols/http'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { AccessDeniedError, UnexpectedError } from '@/domain/Errors'

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor (
    private readonly url: string,
    private readonly httpClient: IHttpClient<RemoteLoadSurveyList.Model[]>) {
  }

  async loadAll (): Promise<LoadSurveyList.Model[]> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'GET'
    })

    const remoteSurveys = httpResponse.body || []

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return remoteSurveys.map(remoteSurvey => Object.assign(remoteSurvey, {
          date: new Date(remoteSurvey.date)
        }))
      case HttpStatusCode.noContent:return []
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveyList{
  export type Model = {
    id: string
    question: string
    date: string
    didAnswer: boolean
  }
}
