import { IHttpClient } from '@/data/protocols/http'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'
import { makeLocalStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'

export const makeAuthorizeHttpClientDecorator = <ResponseType>(): IHttpClient<ResponseType> => {
  return new AuthorizeHttpClientDecorator(
    makeAxiosHttpClient(),
    makeLocalStorageAdapter()
  )
}
