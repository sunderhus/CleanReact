import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { InvalidCredentialsError } from '@/domain/Errors/InvalidCredentialsError'
import { UnexpectedError } from '@/domain/Errors/UnexpectedError'
import { AccountModel } from '@/domain/models/account-model'
import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'
import { IHttpPostClient } from 'data/protocols/http/http-post-client'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient<AuthenticationParams, AccountModel>
  ) {}

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({ url: this.url, body: params })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok : return httpResponse.body
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
