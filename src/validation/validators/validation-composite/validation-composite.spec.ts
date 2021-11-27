import { FieldValidationSpy } from '@/validation/test'
import faker from 'faker'
import { ValidationComposite } from './validation-composite'

type SutTypes={
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (field: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(field),
    new FieldValidationSpy(field)
  ]

  const sut = ValidationComposite.build(fieldValidationsSpy)
  return {
    sut,
    fieldValidationsSpy
  }
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const field = faker.database.column()
    const { sut, fieldValidationsSpy } = makeSut(field)
    const errorMessage = faker.random.words()
    fieldValidationsSpy[0].error = new Error(errorMessage)
    fieldValidationsSpy[1].error = new Error(faker.random.words())

    const error = sut.validate(field, { [field]: faker.random.words() })

    expect(error).toBe(errorMessage)
  })

  test('Should return falsy when no validation fails', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate(field, { [field]: faker.random.words() })

    expect(error).toBeFalsy()
  })
})
