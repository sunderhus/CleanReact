import { HttpPostParams, HttpResponse, IHttpPostClient } from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient<BodyType = unknown, ResponseType= unknown> implements IHttpPostClient<BodyType, ResponseType> {
  async post (params: HttpPostParams<BodyType>): Promise<HttpResponse<ResponseType>> {
    let axiosResponse: AxiosResponse<ResponseType>
    try {
      axiosResponse = await axios.post(params.url, params.body)
    } catch (error) {
      axiosResponse = error.response
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
