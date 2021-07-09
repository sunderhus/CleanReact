import { HttpPostParams, IHttpPostClient } from '../protocols/http/http-post-client'

export class HttpPostClientSpy implements IHttpPostClient {
  url?: string;
  body?: object;

  async post (params: HttpPostParams): Promise<void> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve()
  }
}
