import faker from 'faker'
import * as Helper from '../support/http-mocks'

export const mockInvalidCredentialsError = (): void => Helper.mockInvalidCredentialsError(/login/)

export const mockUnexpectedError = (): void => Helper.mockUnexpectedError(/login/)

export const mockOk = (): void => Helper.mockOk(/login/, {
  accessToken: faker.datatype.uuid()
})

export const mockInvalidDataIntegration = (): void => Helper.mockOk(/login/, {
  invalidProperty: faker.datatype.uuid()
})
