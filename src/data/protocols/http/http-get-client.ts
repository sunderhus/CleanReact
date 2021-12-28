import { HttpResponse } from './http-response'

 type HttpGetParams = {
   url: string
 }

export interface IHttpGetClient<R>{
  get: (params: HttpGetParams) => Promise<HttpResponse<R>>
}
