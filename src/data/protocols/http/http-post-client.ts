export type HttpPostParams = {
  url: string
}

export interface IHttpPostClient{
  post(params: HttpPostParams): Promise<void>
}
