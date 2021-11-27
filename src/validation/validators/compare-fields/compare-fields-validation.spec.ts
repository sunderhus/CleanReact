import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'
import { CompareFieldsValidation } from './compare-fields.validation'

const makeSut = (field: string, fieldToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(field, fieldToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return an error if validation fails', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({ [field]: faker.random.words(), [fieldToCompare]: faker.random.words() })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if validation succeeds ', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const value = faker.random.word()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({ [field]: value, [fieldToCompare]: value })

    expect(error).toBeFalsy()
  })
})
