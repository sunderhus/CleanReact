import { HttpStatusCode, IHttpGetClient } from '@/data/protocols/http'
import { AccessDeniedError } from '@/domain/Errors'

export class RemoteLoadSurveyResult {
  constructor (
    private readonly url,
    private readonly httpGetClient: IHttpGetClient
  ) { }

  async load (): Promise<void> {
    const httpRepsonse = await this.httpGetClient.get({ url: this.url })

    switch (httpRepsonse.statusCode) {
      case HttpStatusCode.ok: break
      default: throw new AccessDeniedError()
    }
  }
}
