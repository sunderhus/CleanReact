import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'

const makeSut = (field: string): MinLengthValidation => {
  const sut = new MinLengthValidation(field, 5)

  return sut
}

describe('MinLengthValidation', () => {
  test('Should return error if value length is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)

    const error = sut.validate({ [field]: faker.datatype.string(4) })

    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return false if value  is valid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)

    const error = sut.validate({ [field]: faker.datatype.string(5) })

    expect(error).toBeFalsy()
  })
})
