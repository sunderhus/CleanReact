import faker from 'faker'
import * as HttpHelper from './http-mocks'

export const mockEmailInUseError = (): void => HttpHelper.mockForbiddenError(/signup/)

export const mockUnexpectedError = (): void => HttpHelper.mockServerError(/signup/)

export const mockOk = (): void => HttpHelper.mockOk(/signup/, {
  accessToken: faker.datatype.uuid(),
  name: faker.internet.userName()
})
