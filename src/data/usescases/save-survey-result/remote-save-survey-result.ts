import { RemoteSurveyResultModel } from '@/data/models'
import { HttpStatusCode, IHttpClient } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/Errors'
import { SaveSurveyResult } from '@/domain/usecases'

export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httpClient: IHttpClient<RemoteSaveSurveyResult.Model>
  ) { }

  async save (params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'PUT',
      body: params
    })
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

export namespace RemoteSaveSurveyResult{
  export type Model = RemoteSurveyResultModel
}
