import { LoadSurveyResult } from '@/domain/usecases/load-survey-result'
import { HttpStatusCode, IHttpClient } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/Errors'
import { RemoteSurveyResultModel } from '@/data/models'

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httpClient: IHttpClient<RemoteLoadSurveyResult.Model>
  ) { }

  async load (): Promise<LoadSurveyResult.Model> {
    const httpResponse = await this.httpClient.request({ url: this.url, method: 'GET' })

    const remoteSurveyResult = httpResponse.body

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return Object.assign({}, remoteSurveyResult, {
          date: new Date(remoteSurveyResult.date)
        })
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveyResult{
  export type Model = RemoteSurveyResultModel
}
