import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocolos/field-validation'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly field: string, private readonly minLength: number) {}

  validate (value: string): Error {
    const isValid = value.length >= this.minLength
    return isValid ? null : new InvalidFieldError()
  }
}
