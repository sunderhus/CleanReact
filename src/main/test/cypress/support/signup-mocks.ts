import faker from 'faker'
import * as Helper from './http-mocks'

export const mockEmailInUseError = (): void => Helper.mockEmailInUseError(/signup/)

export const mockUnexpectedError = (): void => Helper.mockUnexpectedError(/signup/)

export const mockInvalidDataIntegration = (): void => Helper.mockInvalidDataIntegration(/signup/, {
  invalidProperty: faker.random.words()
}
)

export const mockOk = (): void => Helper.mockOk(/signup/, {
  accessToken: faker.datatype.uuid()
})
