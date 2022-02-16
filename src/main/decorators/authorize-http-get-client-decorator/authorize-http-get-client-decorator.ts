import { AccountModel } from '@/domain/models'
import { GetStorage } from '@/data/protocols/cache/get-storage'
import { HttpGetParams, HttpResponse, IHttpGetClient } from '@/data/protocols/http'

export class AuthorizeHttpGetClientDecorator<ResponseType=unknown> implements IHttpGetClient<ResponseType> {
  constructor (
    private readonly httpGetClient: IHttpGetClient<ResponseType>,
    private readonly getStorage: GetStorage<AccountModel>) {
  }

  async get (params: HttpGetParams): Promise<HttpResponse<ResponseType>> {
    const account = this.getStorage.get('account')

    if (account?.accessToken) {
      Object.assign(params, {
        headers: Object.assign(params.headers || {}, {
          'x-access-token': account.accessToken
        })
      })
    }
    const httpResponse = await this.httpGetClient.get(params)

    return httpResponse
  };
}
