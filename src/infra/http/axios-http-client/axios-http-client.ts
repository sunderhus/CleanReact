import { HttpPostParams, HttpResponse, IHttpPostClient } from '@/data/protocols/http'
import axios, { AxiosError, AxiosResponse } from 'axios'

export class AxiosHttpClient implements IHttpPostClient<any, any> {
  async post (params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    let httpResponse: AxiosResponse
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
