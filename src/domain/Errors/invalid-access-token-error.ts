export class InvalidAccessTokenError extends Error {
  constructor () {
    super('Ocorreu um problema no processo de autenticação')
  }
}
