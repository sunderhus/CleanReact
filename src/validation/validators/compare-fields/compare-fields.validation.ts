import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocolos/field-validation'

export class CompareFieldsValidation implements FieldValidation {
  constructor (readonly field: string, private readonly fieldToCompare: string) {}

  validate (schema: object): InvalidFieldError {
    return schema[this.field] !== schema[this.fieldToCompare] ? new InvalidFieldError() : null
  }
}
