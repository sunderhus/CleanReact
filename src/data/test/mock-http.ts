import { HttpPostParams, HttpResponse, HttpStatusCode, IHttpGetClient, IHttpPostClient } from '@/data/protocols/http'
import faker from 'faker'

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()

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
  response: HttpResponse<ResponseType> = {
    statusCode: HttpStatusCode.ok
  }

  async get ({ url }: { url: string }): Promise<HttpResponse<ResponseType>> {
    this.url = url
    const result = await Promise.resolve(this.response)
    return result
  }
}
