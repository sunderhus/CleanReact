import { RequiredFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocolos/field-validation'

export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly field: string) {
  }

  validate (schema: object): RequiredFieldError {
    return schema[this.field] ? null : new RequiredFieldError()
  }
}
