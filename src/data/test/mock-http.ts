import { HttpPostParams, HttpResponse, HttpStatusCode, IHttpPostClient } from '@/data/protocols/http'
import faker from 'faker'

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()

})

export class HttpPostClientSpy<T, R> implements IHttpPostClient<T, R> {
  url?: string;
  body?: T;
  response: HttpResponse<R> ={
    statusCode: HttpStatusCode.ok
  };

  async post (params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body
    const result = Promise.resolve(this.response)
    return result
  }
}
