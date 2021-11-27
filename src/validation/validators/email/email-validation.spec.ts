import { InvalidFieldError } from '@/validation/errors/invalid-field-error'
import faker from 'faker'
import { EmailValidation } from './email-validation'

const makeSut = (field: string): EmailValidation => {
  const sut = new EmailValidation(field)
  return sut
}

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)

    const error = sut.validate({ [field]: faker.random.word() })

    expect(error).toEqual(new InvalidFieldError())
  })
  test('Should return falsy if email is valid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)

    const error = sut.validate({ [field]: faker.internet.email() })

    expect(error).toBeFalsy()
  })
  test('Should return falsy if email is empty', () => {
    const field = faker.database.column()
    const sut = makeSut(field)

    const error = sut.validate({ [field]: '' })

    expect(error).toBeFalsy()
  })
})
