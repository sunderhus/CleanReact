import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'

const makeSut = (): MinLengthValidation => {
  const sut = new MinLengthValidation(faker.database.column(), 5)

  return sut
}

describe('MinLengthValidation', () => {
  test('Should return error if value length is invalid', () => {
    const sut = makeSut()

    const error = sut.validate('123')

    expect(error).toEqual(new InvalidFieldError())
  })
})
