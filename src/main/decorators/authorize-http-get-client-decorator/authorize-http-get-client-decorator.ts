import { AccountModel } from '@/domain/models'
import { GetStorage } from '@/data/protocols/cache/get-storage'
import { HttpGetParams, HttpResponse, IHttpGetClient } from '@/data/protocols/http'

export class AuthorizeHttpGetClientDecorator implements IHttpGetClient {
  constructor (readonly httpGetClient: IHttpGetClient, readonly getStorage: GetStorage<AccountModel>) {

  }

  async get (params: HttpGetParams): Promise<HttpResponse<unknown>> {
    const account = this.getStorage.get('account')

    if (account?.accessToken) {
      Object.assign(params, {
        headers: {
          'x-access-token': account.accessToken
        }
      })
    }
    await this.httpGetClient.get(params)
    return Promise.resolve(null)
  };
}
