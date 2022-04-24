import { RemoteSaveSurveyResult } from '@/data/usescases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators/authorize-http-client-decorator-factory'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'

export const makeRemoteSaveSurveyResult = (id: string): RemoteSaveSurveyResult => {
  return new RemoteSaveSurveyResult(makeApiUrl(`/surveys/${id}/results`), makeAuthorizeHttpClientDecorator())
}
