import { AccountModel } from '@/domain/models'
import { GetStorage } from '@/data/protocols/cache/get-storage'
import { HttpRequest, HttpResponse, IHttpClient } from '@/data/protocols/http'

export class AuthorizeHttpClientDecorator<ResponseType=unknown> implements IHttpClient<ResponseType> {
  constructor (
    private readonly httpClient: IHttpClient<ResponseType>,
    private readonly getStorage: GetStorage<AccountModel>) {
  }

  async request (data: HttpRequest): Promise<HttpResponse<ResponseType>> {
    const account = this.getStorage.get('account')

    if (account?.accessToken) {
      Object.assign(data, {
        headers: Object.assign(data.headers || {}, {
          'x-access-token': account.accessToken
        })
      })
    }
    const httpResponse = await this.httpClient.request(data)

    return httpResponse
  };
}
