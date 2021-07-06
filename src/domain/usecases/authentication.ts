import { AccountModel } from 'domain/models/account-model'

type AutheticationParams = {
  email: string
  password: string
}

export interface Authetication{
  auth(params: AutheticationParams): Promise<AccountModel>
}
