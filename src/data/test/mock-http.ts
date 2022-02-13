import { HttpPostParams, HttpResponse, HttpStatusCode, IHttpGetClient, IHttpPostClient, HttpGetParams } from '@/data/protocols/http'
import faker from 'faker'

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()

})
export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url(),
  headers: faker.random.objectElement()
})

export class HttpPostClientSpy<BodyType, ResponseType> implements IHttpPostClient<BodyType, ResponseType> {
  url?: string;
  body?: BodyType;
  response: HttpResponse<ResponseType> = {
    statusCode: HttpStatusCode.ok
  };

  async post (params: HttpPostParams<BodyType>): Promise<HttpResponse<ResponseType>> {
    this.url = params.url
    this.body = params.body
    const result = Promise.resolve(this.response)
    return result
  }
}

export class HttpGetClientSpy<ResponseType> implements IHttpGetClient<ResponseType> {
  url: string

  headers?: unknown

  response: HttpResponse<ResponseType> = {
    statusCode: HttpStatusCode.ok
  }

  async get (params: HttpGetParams): Promise<HttpResponse<ResponseType>> {
    this.url = params.url
    this.headers = params.headers
    const result = await Promise.resolve(this.response)
    return result
  }
}
