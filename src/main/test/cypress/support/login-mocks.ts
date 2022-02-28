import faker from 'faker'
import * as HttpHelper from '../support/http-mocks'

export const mockInvalidCredentialsError = (): void => HttpHelper.mockUnauthorizedError(/login/)

export const mockUnexpectedError = (): void => HttpHelper.mockServerError(/login/)

export const mockOk = (): void => HttpHelper.mockOk(/login/, {
  accessToken: faker.datatype.uuid(),
  name: faker.internet.userName()
})
