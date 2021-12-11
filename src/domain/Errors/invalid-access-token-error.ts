export class InvalidAccessTokenError extends Error {
  constructor () {
    super('AccessToken inválido.')
  }
}
