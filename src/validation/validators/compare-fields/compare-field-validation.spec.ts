import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocolos/field-validation'
import faker from 'faker'

class CompareFieldsValidation implements FieldValidation {
  constructor (readonly field: string, private readonly valueToCompare: string) {}

  validate (value: string): InvalidFieldError {
    return value === this.valueToCompare ? null : new InvalidFieldError()
  }
}

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
