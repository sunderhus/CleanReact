import * as HttpHelper from './http-mocks'

export const mockUnexpectedError = (): void => HttpHelper.mockServerError(/surveys/)

export const mockAccessDeniedError = (): void => HttpHelper.mockForbiddenError(/surveys/)

export const mockOk = (surveys = []): void => HttpHelper.mockOk(/surveys/, surveys)
