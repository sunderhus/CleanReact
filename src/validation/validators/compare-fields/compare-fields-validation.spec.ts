import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'
import { CompareFieldsValidation } from './compare-fields.validation'

const makeSut = (field: string, fieldToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(field, fieldToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return an error if validation fails', () => {
    const field = 'some-field'
    const fieldToCompare = 'other-field'
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({ [field]: 'any text', [fieldToCompare]: 'diferent text' })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if validation succeeds ', () => {
    const field = 'some-field'
    const fieldToCompare = 'other-field'
    const value = faker.random.word()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({ [field]: value, [fieldToCompare]: value })

    expect(error).toBeFalsy()
  })
})
