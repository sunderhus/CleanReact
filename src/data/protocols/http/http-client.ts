export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden =403,
  notFound = 404,
  serverError = 500,
}
export type HttpMethod = 'POST'|'GET'|'PUT'|'DELETE'

export type HttpRequest<T = unknown> = {
  url: string
  method: HttpMethod
  headers?: unknown
  body?: T
}
export type HttpResponse<T> = {
  statusCode: number
  body?: T
}

export interface IHttpClient<R=unknown>{
  request: (data: HttpRequest) => Promise<HttpResponse<R>>
}
