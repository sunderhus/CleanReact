
import { HttpRequest, HttpResponse, IHttpClient } from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient<BodyType = unknown, ResponseType= unknown> implements IHttpClient {
  async request (data: HttpRequest<BodyType>): Promise<HttpResponse<ResponseType>> {
    let axiosResponse: AxiosResponse<ResponseType>
    try {
      axiosResponse = await axios.request({
        url: data.url,
        data: data.body,
        headers: data.headers,
        method: data.method
      })
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
