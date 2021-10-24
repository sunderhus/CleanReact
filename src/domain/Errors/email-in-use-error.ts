export class EmailInUseError extends Error {
  constructor () {
    super('Este e-mail já está em uso.')
    this.name = 'EmailInUseError'
  }
}
