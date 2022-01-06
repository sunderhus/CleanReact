import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'
export const makeAxiosHttpClient = <BodyType=unknown, ResponseType=unknown>(): AxiosHttpClient<BodyType, ResponseType> => {
  return new AxiosHttpClient<BodyType, ResponseType>()
}
