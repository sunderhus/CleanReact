
export enum HttpStatusCode {
  noContent = 204,
  unauthorized = 401,
}
export type HttpResponse<T=any> = {
  statusCode: number
  body?: T
}
