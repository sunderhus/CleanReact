import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'
import { CompareFieldsValidation } from './compare-fields.validation'

const makeSut = (valueToCompare: string = faker.random.words()): CompareFieldsValidation => new CompareFieldsValidation(faker.database.column(), valueToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return an error if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if validation succeeds ', () => {
    const value = faker.random.word()
    const sut = makeSut(value)
    const error = sut.validate(value)

    expect(error).toBeFalsy()
  })
})
