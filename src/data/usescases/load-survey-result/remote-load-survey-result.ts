import { IHttpGetClient } from '@/data/protocols/http'

export class RemoteLoadSurveyResult {
  constructor (
    private readonly url,
    private readonly httpGetClient: IHttpGetClient
  ) { }

  async load (): Promise<void> {
    await this.httpGetClient.get({ url: this.url })
  }
}
