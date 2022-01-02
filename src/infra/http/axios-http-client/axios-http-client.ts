import { HttpPostParams, HttpResponse, IHttpPostClient } from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient<BodyType = unknown, ResponseType= unknown> implements IHttpPostClient<BodyType, ResponseType> {
  async post (params: HttpPostParams<BodyType>): Promise<HttpResponse<ResponseType>> {
    let httpResponse: AxiosResponse<ResponseType>
    try {
      httpResponse = await axios.post(params.url, params.body)
    } catch (error) {
      httpResponse = error.response
    }

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
