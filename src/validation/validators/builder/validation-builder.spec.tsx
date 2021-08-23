import { RequiredFieldValidation, EmailValidation } from '@/validation/validators'
import { ValidationBuilder as sut } from './validation-builder'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const validations = sut.field('any_field').required().build()

    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })

  test('Should return EmailFieldValidation', () => {
    const validations = sut.field('any_field').email().build()

    expect(validations).toEqual([new EmailValidation('any_field')])
  })

  test('Should return requested validations', () => {
    const validations = sut.field('any_field').required().email().build()

    expect(validations).toEqual([new EmailValidation('any_field'), new RequiredFieldValidation('any_field')])
  })
})
