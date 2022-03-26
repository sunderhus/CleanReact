import { LoadSurveyResult } from '@/domain/usecases/load-survey-result'
import { HttpStatusCode, IHttpGetClient } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/Errors'

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: IHttpGetClient<RemoteLoadSurveyResult.Model>
  ) { }

  async load (): Promise<LoadSurveyResult.Model> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })

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
  export type Model = {
    question: string
    date: string
    answers: Array<{
      image?: string
      asnwer: string
      count: number
      percent: number
      isCurrentAccountAnswer: boolean
    }>
  }
}
