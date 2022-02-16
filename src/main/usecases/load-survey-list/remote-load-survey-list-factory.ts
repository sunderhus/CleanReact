import { RemoteLoadSurveyList } from '@/data/usescases/load-survey-list.ts/remote-load-survey-list'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { makeAuthorizeHttpGetClientDecorator } from '@/main/factories/decorators/authorize-http-get-client-decorator-factory'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'

export const makeRemoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(makeApiUrl('/surveys'), makeAuthorizeHttpGetClientDecorator())
}
