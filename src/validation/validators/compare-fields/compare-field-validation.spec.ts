import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocolos/field-validation'
import faker from 'faker'

class CompareFieldsValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (value: string): InvalidFieldError {
    return new InvalidFieldError()
  }
}

const makeSut = (): CompareFieldsValidation => new CompareFieldsValidation(faker.database.column())

describe('CompareFieldsValidation', () => {
  test('Should return an error if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new InvalidFieldError())
  })
})
