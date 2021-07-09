import { HttpPostParams, IHttpPostClient } from 'data/protocols/http/http-post-client'

export class HttpPostClientSpy implements IHttpPostClient {
  url?: string;

  async post (params: HttpPostParams): Promise<void> {
    this.url = params.url
    return Promise.resolve()
  }
}
