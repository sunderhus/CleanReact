import { FieldValidation } from '@/validation/protocolos/field-validation'

export class FieldValidationSpy implements FieldValidation {
  error: Error = null
  constructor (readonly field: string) {

  }

  validate (schema: object): Error {
    return this.error
  }
}
