export interface IHttpPostClient{
  post(url: string): Promise<void>
}
