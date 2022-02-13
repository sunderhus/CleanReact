import { GetStorage } from '@/data/protocols/cache/get-storage'
import { HttpGetParams, HttpResponse, IHttpGetClient } from '@/data/protocols/http'

export class AuthorizeHttpGetClientDecorator implements IHttpGetClient {
  constructor (readonly httpGetClient: IHttpGetClient, readonly getStorage: GetStorage) {

  }

  async get (params: HttpGetParams): Promise<HttpResponse<unknown>> {
    this.getStorage.get('account')
    return Promise.resolve(null)
  };
}
