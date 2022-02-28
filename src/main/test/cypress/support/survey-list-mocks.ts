import * as HttpHelper from './http-mocks'

export const mockUnexpectedError = (): void => HttpHelper.mockServerError(/surveys/)
