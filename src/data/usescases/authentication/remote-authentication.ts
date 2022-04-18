import { HttpStatusCode, IHttpClient } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/Errors'
import { Authentication } from '@/domain/usecases'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpClient: IHttpClient<RemoteAuthentication.Model>
  ) { }

  async auth (params: Authentication.Params): Promise<Authentication.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      body: params,
      method: 'POST'
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteAuthentication {
  export type Model = Authentication.Model
  export type Params = Authentication.Params
}
