import { Authentication } from '@/domain/usecases'
import faker from 'faker'

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationModel = (): Authentication.Model => ({
  accessToken: faker.datatype.uuid(),
  name: faker.internet.userName()
})
