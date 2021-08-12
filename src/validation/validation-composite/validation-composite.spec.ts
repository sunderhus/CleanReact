import { FieldValidationSpy } from '@/validation/test/mock-field-validation'
import { ValidationComposite } from './validation-composite'

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldValidatorSpy = new FieldValidationSpy('any_field')
    const fieldValidatorSpy2 = new FieldValidationSpy('any_field')
    fieldValidatorSpy.error = new Error('first_error_message')
    fieldValidatorSpy2.error = new Error('second_error_message')

    const sut = new ValidationComposite([fieldValidatorSpy, fieldValidatorSpy2])

    const error = sut.validate('any_field', 'any_value')

    expect(error).toBe('first_error_message')
  })
})
