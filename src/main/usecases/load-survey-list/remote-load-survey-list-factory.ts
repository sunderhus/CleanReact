import { RemoteLoadSurveyList } from '@/data/usescases/load-survey-list.ts/remote-load-survey-list'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'

export const makeRemoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(makeApiUrl('/surveys'), makeAxiosHttpClient())
}
