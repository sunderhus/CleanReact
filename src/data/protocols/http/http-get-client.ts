import { HttpResponse } from './http-response'

export type HttpGetParams = {
  url: string
  headers?: unknown
}

export interface IHttpGetClient<R=unknown>{
  get: (params: HttpGetParams) => Promise<HttpResponse<R>>
}
