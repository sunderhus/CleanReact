import { HttpRequest, HttpResponse, HttpStatusCode, IHttpClient, HttpMethod } from '@/data/protocols/http'
import faker from 'faker'

export const mockHttpRequest = (): HttpRequest<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
  headers: faker.random.objectElement(),
  method: faker.random.arrayElement(['POST', 'GET', 'DELETE', 'PUT'])
})

export class HttpClientSpy<ResponseType, BodyType=unknown> implements IHttpClient<ResponseType> {
  method: HttpMethod;
  url?: string;
  headers?: unknown;
  body?: BodyType;
  response: HttpResponse<ResponseType> = {
    statusCode: HttpStatusCode.ok
  };

  async request (data: HttpRequest<BodyType>): Promise<HttpResponse<ResponseType>> {
    this.url = data.url
    this.body = data.body
    this.method = data.method
    this.headers = data.headers
    const result = Promise.resolve(this.response)
    return result
  }
}
