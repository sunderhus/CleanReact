import { HttpResponse } from '.'

export type HttpPostParams<T> = {
  url: string
  body?: T
}

export interface IHttpPostClient<BodyType=unknown, ResponseType=unknown>{
  post: (params: HttpPostParams<BodyType>) => Promise<HttpResponse<ResponseType>>
}
