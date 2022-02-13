
import { HttpPostParams, HttpGetParams, HttpResponse, IHttpPostClient, IHttpGetClient } from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient<BodyType = unknown, ResponseType= unknown> implements IHttpPostClient, IHttpGetClient {
  async post (params: HttpPostParams<BodyType>): Promise<HttpResponse<ResponseType>> {
    let axiosResponse: AxiosResponse<ResponseType>
    try {
      axiosResponse = await axios.post(params.url, params.body)
    } catch (error) {
      axiosResponse = error.response
    }

    return this.adapt(axiosResponse)
  }

  async get (params: HttpGetParams): Promise<HttpResponse<ResponseType>> {
    let axiosResponse: AxiosResponse<ResponseType>

    try {
      axiosResponse = await axios.get(params.url, { headers: params.headers })
    } catch (error) {
      axiosResponse = error.response
    }

    return this.adapt(axiosResponse)
  }

  private adapt (axiosResponse: AxiosResponse): HttpResponse<ResponseType> {
    return {
      body: axiosResponse.data,
      statusCode: axiosResponse.status
    }
  }
}
