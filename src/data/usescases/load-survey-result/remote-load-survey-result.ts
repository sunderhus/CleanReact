import { HttpStatusCode, IHttpGetClient } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/Errors'

export class RemoteLoadSurveyResult {
  constructor (
    private readonly url,
    private readonly httpGetClient: IHttpGetClient
  ) { }

  async load (): Promise<void> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: break
      case HttpStatusCode.notFound: throw new UnexpectedError()
      case HttpStatusCode.serverError: throw new UnexpectedError()
      default: throw new AccessDeniedError()
    }
  }
}
